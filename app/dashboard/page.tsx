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
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DepositIcon from "@mui/icons-material/Savings";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import SaveIcon from "@mui/icons-material/Save";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import DownloadIcon from "@mui/icons-material/Download";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import DiamondIcon from "@mui/icons-material/Diamond";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  generateDepositCredentials,
  toArray,
  saveDepositCredentials,
  getAllSavedDeposits,
} from "@/lib/crypto";
import SplashCursor from "@/components/SplashCursor";

export default function Dashboard() {
  const wallet = useWallet();
  const xorax = useXoraxProgram();

  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [delay, setDelay] = useState("300");
  const [loading, setLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Relayer connection status
  const [relayerStatus, setRelayerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  // Withdraw form
  const [commitmentHex, setCommitmentHex] = useState("");
  const [secretHex, setSecretHex] = useState("");
  const [nullifierHex, setNullifierHex] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  // Saved deposits
  const [savedDeposits, setSavedDeposits] = useState<any[]>([]);

  // Deposit credentials (shown after successful deposit)
  const [depositCredentials, setDepositCredentials] = useState<{
    amount: number;
    commitment: string;
    secret: string;
    nullifier: string;
    signature: string;
  } | null>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Check relayer health
  useEffect(() => {
    const checkRelayerHealth = async () => {
      try {
        const response = await fetch(
          `${xorax.RELAYER_API_URL || "http://localhost:3001"}/health`,
          {
            method: "GET",
            signal: AbortSignal.timeout(5000), // 5 second timeout
          }
        );

        if (response.ok) {
          setRelayerStatus("online");
        } else {
          setRelayerStatus("offline");
        }
      } catch (error) {
        setRelayerStatus("offline");
      }
    };

    // Initial check
    checkRelayerHealth();

    // Check every 30 seconds
    const interval = setInterval(checkRelayerHealth, 30000);

    return () => clearInterval(interval);
  }, [xorax]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Validate recipient address with checksum
  const validateRecipientAddress = (address: string) => {
    if (!address) {
      setAddressError(null);
      return;
    }

    try {
      const pubkey = new PublicKey(address);
      // Check if the input matches the base58 encoded version (checksum validation)
      if (pubkey.toBase58() !== address) {
        setAddressError("Invalid address format or checksum");
      } else {
        setAddressError(null);
      }
    } catch (error) {
      setAddressError("Invalid Solana address");
    }
  };

  // Handle recipient address change with validation
  const handleRecipientAddressChange = (address: string) => {
    setRecipientAddress(address);
    validateRecipientAddress(address);
  };

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

      // Convert amount to lamports (program will add fees automatically)
      const depositAmountLamports = new BN(amount * 1e9);

      // Make deposit (program adds MIXING_FEE + ESTIMATED_GAS_FEE internally)
      const { signature, commitment } = await xorax.deposit(
        depositAmountLamports,
        toArray(credentials.commitment),
        parseInt(delay)
      );

      // Save credentials to localStorage
      saveDepositCredentials(amount, {
        secretHex: credentials.secretHex,
        nullifierHex: credentials.nullifierHex,
        commitmentHex: credentials.commitmentHex,
      });

      // Reload saved deposits
      setSavedDeposits(getAllSavedDeposits());

      // Store credentials to show in UI
      setDepositCredentials({
        amount,
        commitment,
        secret: credentials.secretHex,
        nullifier: credentials.nullifierHex,
        signature,
      });

      setMessage({
        type: "success",
        text: `Deposit successful! Transaction: ${signature.slice(0, 8)}...`,
      });

      // Auto-download credentials as backup
      const blob = new Blob(
        [
          JSON.stringify(
            {
              amount,
              commitment,
              secret: credentials.secretHex,
              nullifier: credentials.nullifierHex,
              delaySeconds: delay,
              network: "devnet",
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
      a.download = `xorax-deposit-${commitment.substring(0, 8)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Deposit error:", error);

      // Parse error messages for better UX
      let errorMessage = error.message || "Unknown error";

      if (errorMessage.includes("User rejected")) {
        errorMessage = "Transaction cancelled by user";
      } else if (errorMessage.includes("insufficient funds")) {
        errorMessage =
          "Insufficient SOL balance. Please add funds to your wallet.";
      } else if (errorMessage.includes("blockhash")) {
        errorMessage = "Network congestion. Please try again in a few moments.";
      } else if (errorMessage.includes("timeout")) {
        errorMessage = "Transaction timeout. Please try again.";
      } else if (errorMessage.includes("0x1")) {
        errorMessage =
          "Transaction failed. You may have insufficient funds or network issues.";
      }

      setMessage({
        type: "error",
        text: `Deposit failed: ${errorMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!xorax.program) {
      setMessage({ type: "error", text: "Program not loaded" });
      return;
    }

    if (!commitmentHex || !secretHex || !nullifierHex || !recipientAddress) {
      setMessage({
        type: "error",
        text: "Please fill in all withdrawal fields",
      });
      return;
    }

    if (addressError) {
      setMessage({
        type: "error",
        text: "Please enter a valid Solana address",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const recipient = new PublicKey(recipientAddress);

      // Make gasless withdrawal via relayer
      const signature = await xorax.withdraw(
        commitmentHex,
        secretHex,
        nullifierHex,
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
      setCommitmentHex("");
      setSecretHex("");
      setNullifierHex("");
      setRecipientAddress("");

      // Reload saved deposits
      setSavedDeposits(getAllSavedDeposits());
    } catch (error: any) {
      console.error("Withdraw error:", error);

      // Parse error for user-friendly messages
      let errorMessage = error.message || "Unknown error";

      // Remove redundant "Withdrawal failed:" prefix if present
      errorMessage = errorMessage.replace(/^Withdrawal failed:\s*/i, "");

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDepositCredentials = (deposit: any) => {
    setCommitmentHex(deposit.credentials.commitmentHex);
    setSecretHex(deposit.credentials.secretHex);
    setNullifierHex(deposit.credentials.nullifierHex);
    setActiveTab("withdraw");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const credentials = JSON.parse(content);

        // Set the credentials from the uploaded file
        if (credentials.commitment) {
          setCommitmentHex(credentials.commitment);
        }
        if (credentials.secret) {
          setSecretHex(credentials.secret);
        }
        if (credentials.nullifier) {
          setNullifierHex(credentials.nullifier);
        }

        setMessage({
          type: "success",
          text: "Credentials loaded successfully!",
        });
      } catch (error) {
        setMessage({
          type: "error",
          text: "Invalid credentials file. Please check the format.",
        });
      }
    };
    reader.readAsText(file);
  };

  const downloadCredentials = () => {
    if (!depositCredentials) return;

    const blob = new Blob(
      [
        JSON.stringify(
          {
            amount: depositCredentials.amount,
            commitment: depositCredentials.commitment,
            secret: depositCredentials.secret,
            nullifier: depositCredentials.nullifier,
            delaySeconds: delay,
            network: "devnet",
            signature: depositCredentials.signature,
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
    a.download = `xorax-deposit-${depositCredentials.commitment.substring(
      0,
      8
    )}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalCost = (amount: number) => {
    const mixingFee = MIXING_FEE / 1e9;
    const gasFee = ESTIMATED_GAS_FEE / 1e9;
    return (amount + mixingFee + gasFee).toFixed(6);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <SplashCursor />
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-purple-800/30">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 overflow-hidden bg-white">
              <img
                src="/xorax_logo.png"
                alt="Xorax Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Xorax</h1>
              <p className="text-xs text-purple-300">Privacy Mixer</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-purple-900/20 rounded-lg transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Desktop sticky, Mobile drawer */}
      <aside
        className={`
        w-full lg:w-72 bg-linear-to-b from-purple-950/50 to-black border-r border-purple-800/30 backdrop-blur-xl
        lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "fixed inset-y-0 left-0 z-[70] overflow-y-auto transform translate-x-0"
            : "fixed inset-y-0 left-0 z-[70] overflow-y-auto transform -translate-x-full lg:translate-x-0 lg:relative lg:inset-auto"
        }
        lg:block
      `}
      >
        <div className="p-4 lg:p-6 pt-20 lg:pt-6">
          {/* Logo - Desktop only (mobile has header) */}
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 overflow-hidden bg-white">
              <img
                src="/xorax_logo.png"
                alt="Xorax Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Xorax</h1>
              <p className="text-xs text-purple-300">Privacy Mixer</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-6 lg:mb-8">
            <button
              onClick={() => {
                setActiveTab("deposit");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition flex items-center gap-3 ${
                activeTab === "deposit"
                  ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                  : "text-gray-400 hover:text-white hover:bg-purple-900/20"
              }`}
            >
              <LockIcon sx={{ fontSize: 24 }} />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("withdraw");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition flex items-center gap-3 ${
                activeTab === "withdraw"
                  ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                  : "text-gray-400 hover:text-white hover:bg-purple-900/20"
              }`}
            >
              <LockOpenIcon sx={{ fontSize: 24 }} />
              <span>Withdraw</span>
            </button>
          </nav>

          {/* Saved Deposits */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
              <SaveIcon sx={{ fontSize: 18 }} />
              <span>Your Deposits</span>
            </h3>
            {savedDeposits.length === 0 ? (
              <p className="text-gray-500 text-xs italic">
                No saved deposits yet
              </p>
            ) : (
              <div className="space-y-2">
                {savedDeposits.map((deposit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-purple-900/20 border border-purple-700/30 cursor-pointer hover:bg-purple-900/40 hover:border-purple-500/50 transition group"
                    onClick={() => loadDepositCredentials(deposit)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-bold text-sm">
                        {deposit.amount} SOL
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(deposit.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono truncate group-hover:text-purple-300 transition">
                      {deposit.credentials.commitmentHex.substring(0, 12)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-700/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Mixing Fee</span>
                <span className="text-white font-bold text-sm">
                  {(MIXING_FEE / 1e9).toFixed(3)} SOL
                </span>
              </div>
              <div className="w-full h-1 bg-purple-900/50 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-linear-to-r from-purple-500 to-pink-500"></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-900/20 border border-green-700/30">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-semibold">
                  Devnet Active
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono truncate">
                {xorax.programId?.toString().substring(0, 16) || "Loading"}...
              </p>
            </div>

            <div
              className={`p-3 rounded-lg border ${
                relayerStatus === "online"
                  ? "bg-emerald-900/20 border-emerald-700/30"
                  : relayerStatus === "offline"
                  ? "bg-red-900/20 border-red-700/30"
                  : "bg-yellow-900/20 border-yellow-700/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    relayerStatus === "online"
                      ? "bg-emerald-400 animate-pulse"
                      : relayerStatus === "offline"
                      ? "bg-red-400"
                      : "bg-yellow-400 animate-pulse"
                  }`}
                ></div>
                <span
                  className={`text-xs font-semibold ${
                    relayerStatus === "online"
                      ? "text-emerald-300"
                      : relayerStatus === "offline"
                      ? "text-red-300"
                      : "text-yellow-300"
                  }`}
                >
                  Relayer{" "}
                  {relayerStatus === "checking"
                    ? "Checking..."
                    : relayerStatus === "online"
                    ? "Online"
                    : "Offline"}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">
                {relayerStatus === "online"
                  ? "Gasless withdrawals ready"
                  : relayerStatus === "offline"
                  ? "Service unavailable"
                  : "Checking connection..."}
              </p>
            </div>
          </div>

          {/* Back Home */}
          <a
            href="/"
            className="mt-6 block w-full px-4 py-2 rounded-lg text-center text-sm text-gray-400 hover:text-white hover:bg-purple-900/20 transition"
          >
            ← Back to Home
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {/* Top Bar - Desktop only */}
        <div className="hidden lg:block sticky top-0 z-10 bg-black/50 backdrop-blur-xl border-b border-purple-800/30">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                {activeTab === "deposit" ? (
                  <>
                    <LockIcon sx={{ fontSize: 28 }} />
                    <span>Deposit Funds</span>
                  </>
                ) : (
                  <>
                    <LockOpenIcon sx={{ fontSize: 28 }} />
                    <span>Withdraw Funds</span>
                  </>
                )}
              </h2>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">
                {activeTab === "deposit"
                  ? "Mix your SOL with complete privacy"
                  : "Withdraw to any address, gasless & private"}
              </p>
            </div>
            <WalletMultiButton />
          </div>
        </div>

        <div className="p-3 lg:p-8 max-w-4xl mx-auto">
          {message && (
            <div
              className={`mb-4 lg:mb-6 p-4 lg:p-5 rounded-xl border-2 backdrop-blur shadow-2xl animate-in slide-in-from-top duration-300 hover:scale-[1.02] transition-transform ${
                message.type === "success"
                  ? "bg-linear-to-br from-green-900/40 to-emerald-900/40 border-green-500/50 text-green-200 shadow-green-500/30"
                  : "bg-linear-to-br from-red-900/40 to-rose-900/40 border-red-500/50 text-red-200 shadow-red-500/30"
              }`}
            >
              <div className="flex items-start gap-3">
                {message.type === "success" ? (
                  <CheckCircleIcon
                    sx={{ fontSize: 28 }}
                    className="text-green-300"
                  />
                ) : (
                  <ErrorIcon sx={{ fontSize: 28 }} className="text-red-300" />
                )}
                <pre className="whitespace-pre-wrap text-sm flex-1 leading-relaxed">
                  {message.text}
                </pre>
              </div>
            </div>
          )}

          {/* Show credentials after successful deposit */}
          {depositCredentials && (
            <div className="mb-4 lg:mb-6 p-3 lg:p-6 rounded-2xl border-2 bg-linear-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50 backdrop-blur-xl shadow-2xl shadow-purple-500/20 animate-in zoom-in duration-500">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <CelebrationIcon
                      sx={{ fontSize: 32 }}
                      className="text-yellow-400"
                    />
                    Deposit Complete!
                  </h3>
                  <p className="text-xs lg:text-sm text-purple-200">
                    Your credentials are ready. Keep them safe!
                  </p>
                </div>
                <button
                  onClick={() => setDepositCredentials(null)}
                  className="text-gray-400 hover:text-white transition text-xl lg:text-2xl hover:rotate-90 duration-300"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="col-span-1 sm:col-span-2 bg-black/60 p-3 lg:p-4 rounded-xl border border-purple-500/30">
                  <label className="text-xs text-purple-300 block mb-2 font-semibold flex items-center gap-1">
                    <MonetizationOnIcon sx={{ fontSize: 16 }} />
                    <span>AMOUNT</span>
                  </label>
                  <p className="text-white font-bold text-xl lg:text-2xl">
                    {depositCredentials.amount} SOL
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-2 bg-black/60 p-2 lg:p-4 rounded-xl border border-purple-500/30">
                  <label className="text-xs text-purple-300 block mb-2 font-semibold flex items-center gap-1">
                    <VpnKeyIcon sx={{ fontSize: 16 }} />
                    <span>COMMITMENT</span>
                  </label>
                  <p className="text-white font-mono text-xs break-all leading-relaxed">
                    {depositCredentials.commitment}
                  </p>
                </div>

                <div className="bg-black/60 p-2 lg:p-4 rounded-xl border border-purple-500/30">
                  <label className="text-xs text-purple-300 block mb-2 font-semibold flex items-center gap-1">
                    <LockIcon sx={{ fontSize: 16 }} />
                    <span>SECRET</span>
                  </label>
                  <p className="text-white font-mono text-xs break-all leading-relaxed">
                    {depositCredentials.secret}
                  </p>
                </div>

                <div className="bg-black/60 p-2 lg:p-4 rounded-xl border border-purple-500/30">
                  <label className="text-xs text-purple-300 block mb-2 font-semibold flex items-center gap-1">
                    <FlashOnIcon sx={{ fontSize: 16 }} />
                    <span>NULLIFIER</span>
                  </label>
                  <p className="text-white font-mono text-xs break-all leading-relaxed">
                    {depositCredentials.nullifier}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mb-3 lg:mb-4">
                <button
                  onClick={downloadCredentials}
                  className="py-3 lg:py-4 px-4 lg:px-6 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition shadow-lg hover:shadow-purple-500/50 hover:scale-105 duration-300 flex items-center justify-center gap-2 text-sm lg:text-base"
                >
                  <DownloadIcon sx={{ fontSize: 24 }} />
                  <span>Download JSON</span>
                </button>
                <button
                  onClick={() => {
                    setCommitmentHex(depositCredentials.commitment);
                    setSecretHex(depositCredentials.secret);
                    setNullifierHex(depositCredentials.nullifier);
                    setActiveTab("withdraw");
                    setDepositCredentials(null);
                  }}
                  className="py-3 lg:py-4 px-4 lg:px-6 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border-2 border-purple-500/50 hover:border-purple-400 text-white font-bold transition hover:scale-105 duration-300 flex items-center justify-center gap-2 text-sm lg:text-base"
                >
                  <RocketLaunchIcon sx={{ fontSize: 24 }} />
                  <span>Use Now</span>
                </button>
              </div>

              <div className="p-3 lg:p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-xl backdrop-blur">
                <p className="text-xs lg:text-sm text-yellow-200 flex items-start gap-2">
                  <WarningIcon
                    sx={{ fontSize: 20 }}
                    className="text-yellow-300"
                  />
                  <span>
                    <strong>Critical:</strong> These credentials can&apos;t be
                    recovered! Download and store them in a safe place.
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
            <div className="bg-linear-to-br from-purple-900/40 to-purple-950/40 border border-purple-700/50 rounded-xl p-4 backdrop-blur hover:scale-105 transition-all duration-300 cursor-default group">
              <div className="flex items-center gap-2 mb-2">
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 28 }}
                  className="text-purple-400 group-hover:scale-125 transition-transform"
                />
                <span className="text-xs text-purple-300 font-semibold">
                  Total Value
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-bold text-white bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {savedDeposits.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}{" "}
                SOL
              </p>
              <p className="text-xs text-purple-400 mt-1">In mixer</p>
            </div>

            <div className="bg-linear-to-br from-pink-900/40 to-pink-950/40 border border-pink-700/50 rounded-xl p-4 backdrop-blur hover:scale-105 transition-all duration-300 cursor-default group">
              <div className="flex items-center gap-2 mb-2">
                <DepositIcon
                  sx={{ fontSize: 28 }}
                  className="text-pink-400 group-hover:scale-125 transition-transform"
                />
                <span className="text-xs text-pink-300 font-semibold">
                  Active Deposits
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-bold text-white bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {savedDeposits.length}
              </p>
              <p className="text-xs text-pink-400 mt-1">Secured</p>
            </div>

            <div className="bg-linear-to-br from-indigo-900/40 to-indigo-950/40 border border-indigo-700/50 rounded-xl p-4 backdrop-blur hover:scale-105 transition-all duration-300 cursor-default group">
              <div className="flex items-center gap-2 mb-2">
                <BoltIcon
                  sx={{ fontSize: 28 }}
                  className="text-indigo-400 group-hover:scale-125 transition-transform"
                />
                <span className="text-xs text-indigo-300 font-semibold">
                  Mixing Fee
                </span>
              </div>
              <p className="text-xl lg:text-2xl font-bold text-white bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {(MIXING_FEE / 1e9).toFixed(3)} SOL
              </p>
              <p className="text-xs text-indigo-400 mt-1">Per transaction</p>
            </div>

            <div className="bg-linear-to-br from-emerald-900/40 to-emerald-950/40 border border-emerald-700/50 rounded-xl p-4 backdrop-blur hover:scale-105 transition-all duration-300 cursor-default group relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldIcon
                    sx={{ fontSize: 28 }}
                    className="text-emerald-400 group-hover:scale-125 transition-transform"
                  />
                  <span className="text-xs text-emerald-300 font-semibold">
                    Privacy Status
                  </span>
                </div>
                <p className="text-sm lg:text-base font-bold text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Protected
                </p>
                <p className="text-xs text-emerald-400 mt-1">
                  Maximum security
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Deposit Tab */}
            {activeTab === "deposit" && (
              <div className="bg-linear-to-br from-purple-950/30 to-black border border-purple-800/30 rounded-2xl p-3 lg:p-8 backdrop-blur-xl shadow-2xl">
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-6 flex items-center gap-2">
                  <AttachMoneyIcon
                    sx={{ fontSize: 28 }}
                    className="animate-pulse text-green-400"
                  />
                  Choose Amount
                </h3>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3 mb-3 lg:mb-4">
                  {SUGGESTED_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      disabled={loading}
                      className={`group py-4 lg:py-6 px-2 lg:px-4 rounded-xl border-2 text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 duration-300 shadow-lg ${
                        selectedAmount === amt
                          ? "bg-linear-to-br from-purple-600/50 to-pink-600/50 border-purple-400 shadow-purple-500/50"
                          : "bg-linear-to-br from-purple-600/10 to-pink-600/10 border-purple-500/30 hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400 hover:shadow-purple-500/50"
                      }`}
                    >
                      <div className="mb-1 lg:mb-2 group-hover:scale-110 transition duration-300">
                        {amt >= 5 ? (
                          <DiamondIcon
                            sx={{ fontSize: 32 }}
                            className="text-purple-300"
                          />
                        ) : (
                          <MonetizationOnIcon
                            sx={{ fontSize: 32 }}
                            className="text-yellow-400"
                          />
                        )}
                      </div>
                      <div className="text-base lg:text-xl">{amt} SOL</div>
                      <div className="text-xs text-purple-300 mt-1">
                        +{((MIXING_FEE + ESTIMATED_GAS_FEE) / 1e9).toFixed(3)}{" "}
                        fees
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-3 lg:mb-6">
                  <label className="block text-xs lg:text-sm font-semibold text-purple-300 mb-2 lg:mb-3">
                    Or enter custom amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={MIN_DEPOSIT_AMOUNT}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder={`Min ${MIN_DEPOSIT_AMOUNT} SOL`}
                    className="w-full px-4 py-4 rounded-xl bg-black/60 border-2 border-purple-800/50 focus:border-purple-500 text-white placeholder-gray-500 outline-none transition text-lg font-semibold"
                  />
                </div>

                {/* Mix Button */}
                <div className="mb-3 lg:mb-6">
                  <button
                    onClick={() => {
                      const amount = selectedAmount || parseFloat(customAmount);
                      if (amount && amount >= MIN_DEPOSIT_AMOUNT) {
                        handleDeposit(amount);
                      }
                    }}
                    disabled={
                      loading ||
                      (!selectedAmount &&
                        (!customAmount ||
                          parseFloat(customAmount) < MIN_DEPOSIT_AMOUNT))
                    }
                    className="w-full py-4 lg:py-5 px-6 lg:px-8 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base lg:text-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50 hover:scale-105 duration-300 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <HourglassEmptyIcon
                          sx={{ fontSize: 24 }}
                          className="animate-spin"
                        />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <WhatshotIcon sx={{ fontSize: 24 }} />
                        <span>
                          Mix{" "}
                          {selectedAmount ||
                            (customAmount &&
                            parseFloat(customAmount) >= MIN_DEPOSIT_AMOUNT
                              ? parseFloat(customAmount).toFixed(2)
                              : "")}{" "}
                          {(selectedAmount || customAmount) && "SOL"}
                        </span>
                      </>
                    )}
                  </button>
                  {(selectedAmount ||
                    (customAmount &&
                      parseFloat(customAmount) >= MIN_DEPOSIT_AMOUNT)) && (
                    <p className="text-xs text-purple-300 text-center mt-2">
                      Total cost:{" "}
                      {totalCost(selectedAmount || parseFloat(customAmount))}{" "}
                      SOL (includes fees)
                    </p>
                  )}
                </div>

                {/* Withdrawal Delay */}
                <div className="mb-3 lg:mb-6">
                  <label className="block text-xs lg:text-sm font-semibold text-purple-300 mb-2 lg:mb-3 flex items-center gap-2">
                    <AccessTimeIcon sx={{ fontSize: 20 }} />
                    <span>Privacy Delay</span>
                    <span className="text-xs font-normal text-purple-400 ml-auto">
                      (Longer = Better Privacy)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
                    {delayOptions.map((option, idx) => (
                      <button
                        key={option.value}
                        onClick={() => setDelay(option.value)}
                        className={`group relative py-3 lg:py-4 px-3 lg:px-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 overflow-hidden ${
                          delay === option.value
                            ? "bg-linear-to-br from-purple-600/40 to-pink-600/40 border-purple-400 text-white shadow-lg shadow-purple-500/50 scale-105"
                            : "bg-purple-600/10 border-purple-800/30 text-gray-400 hover:text-white hover:border-purple-600 hover:bg-purple-600/20 hover:shadow-lg"
                        }`}
                      >
                        {/* Animated background on hover */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

                        <div className="relative">
                          <div className="font-bold text-sm lg:text-base mb-1">
                            {option.label}
                          </div>
                          <div
                            className={`text-xs mt-1 flex items-center justify-center gap-1 ${
                              delay === option.value
                                ? "text-purple-200"
                                : "opacity-75"
                            }`}
                          >
                            {/* Privacy level indicator */}
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-3 rounded-full ${
                                    i <= idx
                                      ? delay === option.value
                                        ? "bg-purple-300"
                                        : "bg-purple-500"
                                      : "bg-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-1">{option.privacy}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-linear-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-4 lg:p-5 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <InfoIcon sx={{ fontSize: 32 }} className="text-blue-400" />
                    <div className="text-xs lg:text-sm text-purple-100">
                      <p className="font-bold mb-2 text-base lg:text-lg">
                        How it works
                      </p>
                      <ul className="space-y-2 text-xs leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Deposit any amount + {(MIXING_FEE / 1e9).toFixed(2)}{" "}
                            SOL mixing fee
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Wait for the privacy delay period</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Withdraw to any address - totally gasless!
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Your credentials = your keys</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Withdraw Tab */}
            {activeTab === "withdraw" && (
              <div className="bg-linear-to-br from-purple-950/30 to-black border border-purple-800/30 rounded-2xl p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <LockOpenIcon sx={{ fontSize: 28 }} />
                  Withdraw Privately
                </h3>

                {/* File Upload Section */}
                <div className="mb-4 lg:mb-6 p-4 lg:p-6 bg-linear-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-700/50 border-dashed rounded-xl backdrop-blur hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  <label className="flex flex-col items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <div className="group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                        <FolderOpenIcon
                          sx={{ fontSize: 64 }}
                          className="text-purple-400"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-200 font-bold text-base lg:text-lg mb-1">
                        Upload Credentials File
                      </p>
                      <p className="text-xs text-purple-300">
                        Click to upload your JSON file or drag it here
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="px-6 py-2.5 rounded-lg bg-linear-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 text-purple-100 text-sm font-semibold group-hover:from-purple-600/50 group-hover:to-pink-600/50 group-hover:border-purple-400 group-hover:scale-105 transition-all duration-300 shadow-lg">
                      Choose File
                    </div>
                  </label>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-purple-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-linear-to-r from-purple-950/80 to-black text-purple-300 font-semibold">
                      Or enter manually
                    </span>
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <label className="text-xs lg:text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <VpnKeyIcon sx={{ fontSize: 18 }} /> Commitment
                    </label>
                    <input
                      type="text"
                      value={commitmentHex}
                      onChange={(e) => setCommitmentHex(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-3 lg:px-4 py-3 lg:py-4 rounded-xl bg-black/60 border-2 border-purple-800/50 focus:border-purple-500 text-white placeholder-gray-500 outline-none transition font-mono text-xs lg:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs lg:text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <LockIcon sx={{ fontSize: 18 }} /> Secret
                    </label>
                    <input
                      type="text"
                      value={secretHex}
                      onChange={(e) => setSecretHex(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-3 lg:px-4 py-3 lg:py-4 rounded-xl bg-black/60 border-2 border-purple-800/50 focus:border-purple-500 text-white placeholder-gray-500 outline-none transition font-mono text-xs lg:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs lg:text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <FlashOnIcon sx={{ fontSize: 18 }} /> Nullifier
                    </label>
                    <input
                      type="text"
                      value={nullifierHex}
                      onChange={(e) => setNullifierHex(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-3 lg:px-4 py-3 lg:py-4 rounded-xl bg-black/60 border-2 border-purple-800/50 focus:border-purple-500 text-white placeholder-gray-500 outline-none transition font-mono text-xs lg:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs lg:text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <LocationOnIcon sx={{ fontSize: 18 }} /> Recipient Address
                    </label>
                    <input
                      type="text"
                      value={recipientAddress}
                      onChange={(e) =>
                        handleRecipientAddressChange(e.target.value)
                      }
                      placeholder="Can be an unfunded address!"
                      className={`w-full px-3 lg:px-4 py-3 lg:py-4 rounded-xl bg-black/60 border-2 ${
                        addressError
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-purple-800/50 focus:border-purple-500"
                      } text-white placeholder-gray-500 outline-none transition font-mono text-xs lg:text-sm`}
                    />
                    {addressError && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <WarningIcon sx={{ fontSize: 16 }} /> {addressError}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleWithdraw}
                    disabled={loading}
                    className="w-full py-4 lg:py-5 px-6 lg:px-8 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base lg:text-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50 hover:scale-105 duration-300 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <HourglassEmptyIcon
                          sx={{ fontSize: 24 }}
                          className="animate-spin"
                        />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <RocketLaunchIcon sx={{ fontSize: 24 }} />
                        <span>Withdraw (Gasless!)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 lg:mt-6 bg-linear-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-3 lg:p-5 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <LocalFireDepartmentIcon
                      sx={{ fontSize: 32 }}
                      className="text-orange-400"
                    />
                    <div className="text-xs lg:text-sm text-purple-100">
                      <p className="font-bold mb-2 text-base lg:text-lg">
                        Gasless Withdrawal
                      </p>
                      <p className="text-xs leading-relaxed">
                        No wallet needed! Withdraw to any address, even unfunded
                        ones. The relayer covers the gas - you just need your
                        credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
