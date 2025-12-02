"use client";

import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [selectedPool, setSelectedPool] = useState("0.1");
  const [delay, setDelay] = useState("300"); // 5 minutes default
  const [walletConnected, setWalletConnected] = useState(false);

  const pools = [
    { value: "0.1", label: "0.1 SOL", anonymitySet: 234 },
    { value: "0.5", label: "0.5 SOL", anonymitySet: 156 },
    { value: "1", label: "1 SOL", anonymitySet: 423 },
    { value: "5", label: "5 SOL", anonymitySet: 89 },
    { value: "10", label: "10 SOL", anonymitySet: 67 },
  ];

  const delayOptions = [
    { value: "300", label: "5 minutes", privacy: "Low" },
    { value: "1800", label: "30 minutes", privacy: "Medium" },
    { value: "3600", label: "1 hour", privacy: "Good" },
    { value: "21600", label: "6 hours", privacy: "High" },
    { value: "86400", label: "24 hours", privacy: "Maximum" },
  ];

  const privacyScore = () => {
    const pool = pools.find((p) => p.value === selectedPool);
    const delayOption = delayOptions.find((d) => d.value === delay);
    if (!pool) return 0;

    // Simple score calculation: anonymity set + delay bonus
    const baseScore = Math.min((pool.anonymitySet / 500) * 50, 50);
    const delayBonus = (parseInt(delay) / 86400) * 50;
    return Math.round(baseScore + delayBonus);
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
            {walletConnected ? (
              <button className="px-6 py-2 bg-purple-600/20 border border-purple-500 rounded-full text-purple-300 font-medium">
                Wallet Connected
              </button>
            ) : (
              <button
                onClick={() => setWalletConnected(true)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
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
                        className={`p-4 rounded-xl border-2 transition ${
                          selectedPool === pool.value
                            ? "border-purple-500 bg-purple-900/50"
                            : "border-purple-800/30 bg-white/5 hover:border-purple-700"
                        }`}
                      >
                        <div className="text-white font-bold mb-1">
                          {pool.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {pool.anonymitySet} users
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
                        className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${
                          delay === option.value
                            ? "border-purple-500 bg-purple-900/50"
                            : "border-purple-800/30 bg-white/5 hover:border-purple-700"
                        }`}
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
                      {(parseFloat(selectedPool) + 0.010005).toFixed(6)} SOL
                    </span>
                  </div>
                </div>

                {/* Deposit Button */}
                <button
                  disabled={!walletConnected}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {walletConnected
                    ? "Deposit & Mix Now"
                    : "Connect Wallet to Continue"}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Save your secret! You'll need it to withdraw later.
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
                    Secret (32-byte hex)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your secret from deposit..."
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Nullifier (32-byte hex)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your nullifier from deposit..."
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    placeholder="Solana address to receive funds..."
                    className="w-full px-4 py-3 bg-white/5 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
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
                  disabled={!walletConnected}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {walletConnected
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
                  <span className="text-gray-400">Total Deposits</span>
                  <span className="text-white font-semibold">
                    {pools.find((p) => p.value === selectedPool)
                      ?.anonymitySet || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Anonymity Set</span>
                  <span className="text-green-400 font-semibold">
                    {pools.find((p) => p.value === selectedPool)
                      ?.anonymitySet || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Size</span>
                  <span className="text-white font-semibold">
                    {selectedPool} SOL
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Deposit: 1 SOL</span>
                  <span className="text-gray-600 ml-auto">2m ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Withdraw: 0.5 SOL</span>
                  <span className="text-gray-600 ml-auto">15m ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Deposit: 5 SOL</span>
                  <span className="text-gray-600 ml-auto">1h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400">Withdraw: 0.1 SOL</span>
                  <span className="text-gray-600 ml-auto">3h ago</span>
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
