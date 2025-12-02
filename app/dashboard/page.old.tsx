"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import {
  useXoraxProgram,
  SUGGESTED_AMOUNTS,
  MIXING_FEE,
  ESTIMATED_GAS_FEE,
  MIN_DEPOSIT_AMOUNT,
} from "@/hooks/useXoraxProgram";
import {
  generateDepositCredentials,
  toArray,
  saveDepositCredentials,
  getAllSavedDeposits,
} from "@/lib/crypto";

export default function Dashboard() {
  const wallet = useWallet();
  const xorax = useXoraxProgram();

  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [customAmount, setCustomAmount] = useState("");
  const [delay, setDelay] = useState("300");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Withdraw form
  const [commitmentHex, setCommitmentHex] = useState("");
  const [secretHex, setSecretHex] = useState("");
  const [nullifierHex, setNullifierHex] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  // Saved deposits
  const [savedDeposits, setSavedDeposits] = useState<any[]>([]);

  const delayOptions = [
    { value: "300", label: "5 minutes", privacy: "Low" },
    { value: "1800", label: "30 minutes", privacy: "Medium" },
    { value: "3600", label: "1 hour", privacy: "Good" },
    { value: "21600", label: "6 hours", privacy: "High" },
    { value: "86400", label: "24 hours", privacy: "Maximum" },
  ];

  // Load saved deposits
  useEffect(() => {
    const deposits = getAllSavedDeposits();
    setSavedDeposits(deposits);
  }, []);

  const handleDeposit = async (amount: number) => {
    if (!wallet.publicKey || !xorax.program) {
      setMessage({ type: "error", text: "Please connect your wallet" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Generate deposit credentials
      const credentials = await generateDepositCredentials();

      // Get denomination
      const denomination =
        POOL_DENOMINATIONS[selectedPool as keyof typeof POOL_DENOMINATIONS];

      // Make deposit
      const { signature, depositIndex } = await xorax.deposit(
        denomination,
        toArray(credentials.commitment),
        parseInt(delay)
      );

      // Save credentials to localStorage
      saveDepositCredentials(selectedPool, depositIndex.toNumber(), {
        secretHex: credentials.secretHex,
        nullifierHex: credentials.nullifierHex,
        commitmentHex: credentials.commitmentHex,
      });

      setMessage({
        type: "success",
        text: `Deposit successful! Tx: ${signature.slice(
          0,
          8
        )}... SAVE YOUR CREDENTIALS:\nSecret: ${
          credentials.secretHex
        }\nNullifier: ${
          credentials.nullifierHex
        }\nDeposit Index: ${depositIndex.toString()}`,
      });

      // Download credentials as a file
      const blob = new Blob(
        [
          JSON.stringify(
            {
              pool: selectedPool,
              depositIndex: depositIndex.toString(),
              secret: credentials.secretHex,
              nullifier: credentials.nullifierHex,
              commitment: credentials.commitmentHex,
              delaySeconds: delay,
            },
            null,
            2
          ),
        ],
        { type: "application/json" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `xorax-deposit-${selectedPool}-${depositIndex}.json`;
      a.click();
    } catch (error: any) {
      console.error("Deposit error:", error);
      setMessage({
        type: "error",
        text: `Deposit failed: ${error.message || "Unknown error"}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!wallet.publicKey || !xorax.program) {
      setMessage({ type: "error", text: "Please connect your wallet" });
      return;
    }

    if (
      !secretHex ||
      !nullifierHex ||
      !recipientAddress ||
      !depositIndexInput
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all withdrawal fields",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Parse inputs
      const secret = fromHex(secretHex);
      const nullifier = fromHex(nullifierHex);
      const recipient = new PublicKey(recipientAddress);
      const depositIndex = new BN(depositIndexInput);
      const denomination =
        POOL_DENOMINATIONS[selectedPool as keyof typeof POOL_DENOMINATIONS];

      // Make withdrawal
      const signature = await xorax.withdraw(
        denomination,
        depositIndex,
        toArray(secret),
        toArray(nullifier),
        recipient
      );

      setMessage({
        type: "success",
        text: `Withdrawal successful! Tx: ${signature.slice(
          0,
          8
        )}... Funds sent to ${recipientAddress.slice(0, 8)}...`,
      });

      // Clear form
      setSecretHex("");
      setNullifierHex("");
      setRecipientAddress("");
      setDepositIndexInput("");
    } catch (error: any) {
      console.error("Withdraw error:", error);
      setMessage({
        type: "error",
        text: `Withdrawal failed: ${error.message || "Unknown error"}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const privacyScore = () => {
    const anonymitySet = poolStats[selectedPool] || 0;
    const baseScore = Math.min((anonymitySet / 500) * 50, 50);
    const delayBonus = (parseInt(delay) / 86400) * 50;
    return Math.round(baseScore + delayBonus);
  };

  const totalCost = () => {
    const poolAmount = parseFloat(selectedPool);
    const mixingFee = MIXING_FEE.toNumber() / 1e9;
    const gasFee = ESTIMATED_GAS_FEE.toNumber() / 1e9;
    return (poolAmount + mixingFee + gasFee).toFixed(6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-950">
      {/* Header */}
      <header className="border-b border-purple-900/50 bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">X</span>
            </div>
            <span className="text-2xl font-bold text-white">Xorax</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/" className="text-gray-300 hover:text-white transition">
              ← Back to Home
            </a>
            <WalletMultiButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border-2 ${
              message.type === "success"
                ? "bg-green-900/30 border-green-500 text-green-300"
                : "bg-red-900/30 border-red-500 text-red-300"
            }`}
          >
            <pre className="whitespace-pre-wrap text-sm">{message.text}</pre>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            {/* Tab Selector */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-2 mb-6 flex gap-2">
              <button
                onClick={() => setActiveTab("deposit")}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  activeTab === "deposit"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                💰 Deposit & Mix
              </button>
              <button
                onClick={() => setActiveTab("withdraw")}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  activeTab === "withdraw"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🎯 Withdraw
              </button>
            </div>

            {/* Deposit Tab */}
            {activeTab === "deposit" && (
              <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Deposit & Mix
                </h2>

                {/* Pool Selection */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Select Pool Size
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {pools.map((pool) => (
                      <button
                        key={pool.value}
                        onClick={() => setSelectedPool(pool.value)}
                        disabled={loading}
                        className={`p-4 rounded-xl border-2 transition ${
                          selectedPool === pool.value
                            ? "border-purple-500 bg-purple-900/50"
                            : "border-purple-800/30 bg-white/5 hover:border-purple-700"
                        } disabled:opacity-50`}
                      >
                        <div className="text-white font-bold mb-1">
                          {pool.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {poolStats[pool.value] || 0} deposits
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delay Selection */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Withdrawal Delay{" "}
                    <span className="text-sm text-gray-500">
                      (more time = more privacy)
                    </span>
                  </label>
                  <div className="space-y-2">
                    {delayOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setDelay(option.value)}
                        disabled={loading}
                        className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${
                          delay === option.value
                            ? "border-purple-500 bg-purple-900/50"
                            : "border-purple-800/30 bg-white/5 hover:border-purple-700"
                        } disabled:opacity-50`}
                      >
                        <span className="text-white font-medium">
                          {option.label}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            option.privacy === "Maximum" ||
                            option.privacy === "High"
                              ? "bg-green-500/20 text-green-400"
                              : option.privacy === "Good"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {option.privacy} Privacy
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-purple-900/30 border border-purple-800/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Pool Amount</span>
                    <span className="text-white font-semibold">
                      {selectedPool} SOL
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Mixing Fee</span>
                    <span className="text-white font-semibold">0.01 SOL</span>
                  </div>
                  <div className="flex justify-between text-gray-300 mb-3">
                    <span>Gas Fee (est.)</span>
                    <span className="text-white font-semibold">
                      0.000005 SOL
                    </span>
                  </div>
                  <div className="border-t border-purple-700 pt-3 flex justify-between">
                    <span className="text-white font-bold">Total Cost</span>
                    <span className="text-white font-bold">
                      {totalCost()} SOL
                    </span>
                  </div>
                </div>

                {/* Deposit Button */}
                <button
                  onClick={handleDeposit}
                  disabled={!wallet.connected || loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : wallet.connected
                    ? "Deposit & Mix Now"
                    : "Connect Wallet to Continue"}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  ⚠️ Your credentials will be automatically downloaded. SAVE
                  THEM SECURELY!
                </p>
              </div>
            )}

            {/* Withdraw Tab */}
            {activeTab === "withdraw" && (
              <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Withdraw Funds
                </h2>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Pool Size
                  </label>
                  <select
                    value={selectedPool}
                    onChange={(e) => setSelectedPool(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  >
                    {pools.map((pool) => (
                      <option key={pool.value} value={pool.value}>
                        {pool.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Deposit Index
                  </label>
                  <input
                    type="text"
                    value={depositIndexInput}
                    onChange={(e) => setDepositIndexInput(e.target.value)}
                    placeholder="Your deposit index number..."
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Secret (64 hex characters)
                  </label>
                  <input
                    type="text"
                    value={secretHex}
                    onChange={(e) => setSecretHex(e.target.value)}
                    placeholder="Enter your secret from deposit..."
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 font-mono text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Nullifier (64 hex characters)
                  </label>
                  <input
                    type="text"
                    value={nullifierHex}
                    onChange={(e) => setNullifierHex(e.target.value)}
                    placeholder="Enter your nullifier from deposit..."
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 font-mono text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Solana address to receive funds..."
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 font-mono text-sm"
                  />
                </div>

                <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <div className="text-yellow-400 font-semibold mb-1">
                        Important
                      </div>
                      <p className="text-sm text-gray-300">
                        Make sure your time delay has passed. Use a fresh
                        recipient address for maximum privacy. Never reuse
                        withdrawal addresses.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWithdraw}
                  disabled={!wallet.connected || loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : wallet.connected
                    ? "Verify & Withdraw"
                    : "Connect Wallet to Continue"}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Score */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Privacy Score
              </h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span
                      className={`text-4xl font-bold ${
                        privacyScore() >= 80
                          ? "text-green-400"
                          : privacyScore() >= 60
                          ? "text-yellow-400"
                          : "text-orange-400"
                      }`}
                    >
                      {privacyScore()}
                    </span>
                    <span className="text-gray-400">/100</span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-purple-900/50">
                  <div
                    style={{ width: `${privacyScore()}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Based on anonymity set size and your selected delay. Higher is
                better!
              </p>
            </div>

            {/* Pool Stats */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Pool Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Anonymity Set</span>
                  <span className="text-green-400 font-semibold">
                    {poolStats[selectedPool] || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Size</span>
                  <span className="text-white font-semibold">
                    {selectedPool} SOL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="text-purple-400 font-semibold">Devnet</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-purple-900/30 border border-purple-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Check our documentation or join our community for support.
              </p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-purple-400 hover:text-purple-300 text-sm transition"
                >
                  📚 Documentation →
                </a>
                <a
                  href="#"
                  className="block text-purple-400 hover:text-purple-300 text-sm transition"
                >
                  💬 Discord Community →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
