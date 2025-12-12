"use client";

import { useState } from "react";
import Link from "next/link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import SecurityIcon from "@mui/icons-material/Security";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TollIcon from "@mui/icons-material/Toll";
import CodeIcon from "@mui/icons-material/Code";
import ApiIcon from "@mui/icons-material/Api";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoopIcon from "@mui/icons-material/Loop";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BarChartIcon from "@mui/icons-material/BarChart";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketIcon from "@mui/icons-material/Rocket";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DiamondIcon from "@mui/icons-material/Diamond";
import WarningIcon from "@mui/icons-material/Warning";
import SplashCursor from "@/components/SplashCursor";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: "introduction", label: "Introduction", icon: InfoIcon },
    {
      id: "how-it-works",
      label: "How It Works",
      icon: PsychologyIcon,
    },
    {
      id: "getting-started",
      label: "Getting Started",
      icon: RocketLaunchIcon,
    },
    {
      id: "depositing",
      label: "Depositing SOL",
      icon: AccountBalanceWalletIcon,
    },
    {
      id: "withdrawing",
      label: "Withdrawing SOL",
      icon: PaymentsIcon,
    },
    { id: "security", label: "Security Model", icon: SecurityIcon },
    {
      id: "fees",
      label: "Fees & Economics",
      icon: MonetizationOnIcon,
    },
    { id: "token", label: "$XORAX Token", icon: TollIcon },
    {
      id: "technical",
      label: "Technical Details",
      icon: CodeIcon,
    },
    {
      id: "sdk",
      label: "SDK & API",
      icon: ApiIcon,
    },
    { id: "faq", label: "FAQ", icon: HelpIcon },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-black to-purple-950">
      <SplashCursor />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white hover:opacity-80 transition mb-6"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">X</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold">Xorax</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Documentation
          </h1>
          <p className="text-gray-400 text-lg">
            Everything you need to know about using Xorax privacy mixer
          </p>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
          aria-label="Toggle navigation"
        >
          {isSidebarOpen ? (
            <CloseIcon sx={{ fontSize: 32 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 32 }} />
          )}
        </button>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transform transition-transform duration-300 ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-purple-800/30 p-4 lg:sticky lg:top-8 h-full lg:h-auto overflow-y-auto">
              {/* Mobile Close Button */}
              <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b border-purple-800/30">
                <div className="flex items-center gap-2">
                  <MenuBookIcon className="text-purple-400" />
                  <span className="text-white font-semibold">Navigation</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-purple-900/30"
                      }`}
                    >
                      <IconComponent
                        className="flex-shrink-0"
                        sx={{ fontSize: 24 }}
                      />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 bg-white/5 backdrop-blur rounded-2xl border border-purple-800/30 p-6 lg:p-10">
            {activeSection === "introduction" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Introduction to Xorax
                </h2>
                <p className="text-gray-300 mb-4">
                  Xorax is a non-custodial privacy mixer built on Solana that
                  breaks the on-chain link between deposits and withdrawals
                  using cryptographic commitments.
                </p>
                <p className="text-gray-300 mb-4">
                  Unlike traditional mixers that use fixed denomination pools,
                  Xorax allows you to mix <strong>any amount</strong> of SOL
                  with customizable time delays, providing maximum flexibility
                  and privacy.
                </p>
                <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6 my-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✅ Mix any amount from 0.1 SOL to 10+ SOL</li>
                    <li>✅ Flexible time delays (5 min to 24 hours)</li>
                    <li>✅ Non-custodial - you control your keys</li>
                    <li>✅ Cryptographic privacy using commitments</li>
                    <li>✅ Low fees (0.01 SOL + minimal gas)</li>
                    <li>✅ Built on Solana for speed and low costs</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "how-it-works" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  How Xorax Works
                </h2>
                <p className="text-gray-300 mb-6">
                  Xorax uses cryptographic commitments to ensure your deposits
                  cannot be linked to your withdrawals on-chain.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      1. Cryptographic Commitment
                    </h3>
                    <p className="text-gray-300 mb-3">
                      When you deposit, the protocol generates two random
                      values:
                    </p>
                    <ul className="space-y-2 text-gray-300 mb-3">
                      <li>
                        <strong className="text-purple-400">Secret:</strong> A
                        random 32-byte value
                      </li>
                      <li>
                        <strong className="text-purple-400">Nullifier:</strong>{" "}
                        Another random 32-byte value
                      </li>
                    </ul>
                    <p className="text-gray-300">
                      These are hashed together to create a{" "}
                      <strong>commitment</strong> that's stored on-chain. Only
                      you know the secret and nullifier.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      2. Time Delay for Privacy
                    </h3>
                    <p className="text-gray-300">
                      After depositing, you must wait for your chosen time delay
                      to expire. During this time, other users deposit and
                      withdraw, creating an anonymity set that makes it
                      impossible to link specific deposits to withdrawals.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      3. Private Withdrawal
                    </h3>
                    <p className="text-gray-300">
                      To withdraw, you provide your secret and nullifier (which
                      only you know). The protocol verifies you made a valid
                      deposit and ensures the nullifier hasn't been used before
                      (preventing double-spending). Your withdrawal can go to
                      any Solana address - there's no on-chain link to your
                      deposit address.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "getting-started" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Getting Started
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        A Solana wallet (Phantom, Solflare, Backpack, etc.)
                      </li>
                      <li>SOL tokens in your wallet</li>
                      <li>
                        Minimum deposit: 0.1 SOL + 0.01 SOL fee + gas (~0.001
                        SOL)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Quick Start Steps
                    </h3>
                    <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                      <li>
                        Connect your Solana wallet to{" "}
                        <Link
                          href="/dashboard"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Xorax Dashboard
                        </Link>
                      </li>
                      <li>Select or enter the amount you want to mix</li>
                      <li>
                        Choose a time delay (longer = more privacy as more
                        people mix)
                      </li>
                      <li>Click "Mix" to deposit your SOL</li>
                      <li>
                        Save your credentials (secret, nullifier, commitment) -
                        they're auto-saved to localStorage
                      </li>
                      <li>
                        Wait for the time delay to expire, then withdraw to any
                        address
                      </li>
                    </ol>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-yellow-400 mb-3">
                      ⚠️ Important Security Warning
                    </h4>
                    <p className="text-gray-300">
                      Your secret and nullifier are the ONLY way to withdraw
                      your funds. If you lose them, your funds are permanently
                      locked. Always back them up securely!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "depositing" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Depositing SOL
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Step-by-Step Deposit Guide
                    </h3>
                    <ol className="space-y-4 text-gray-300">
                      <li>
                        <strong className="text-purple-400">
                          1. Choose Amount
                        </strong>
                        <p className="mt-2">
                          Use quick select buttons (0.1, 0.5, 1, 5, 10 SOL) or
                          enter a custom amount. Remember to account for the
                          0.01 SOL mixing fee and gas costs.
                        </p>
                      </li>
                      <li>
                        <strong className="text-purple-400">
                          2. Select Time Delay
                        </strong>
                        <p className="mt-2">Choose from:</p>
                        <ul className="mt-2 space-y-1 ml-6">
                          <li>5 minutes (Low privacy)</li>
                          <li>30 minutes (Medium privacy)</li>
                          <li>1 hour (Good privacy)</li>
                          <li>6 hours (High privacy)</li>
                          <li>24 hours (Maximum privacy)</li>
                        </ul>
                      </li>
                      <li>
                        <strong className="text-purple-400">
                          3. Click "Mix"
                        </strong>
                        <p className="mt-2">
                          Approve the transaction in your wallet. The protocol
                          will automatically generate your secret and nullifier.
                        </p>
                      </li>
                      <li>
                        <strong className="text-purple-400">
                          4. Save Credentials
                        </strong>
                        <p className="mt-2">
                          After successful deposit, you'll see your:
                        </p>
                        <ul className="mt-2 space-y-1 ml-6">
                          <li>Commitment (public, stored on-chain)</li>
                          <li>Secret (private, only you know)</li>
                          <li>Nullifier (private, only you know)</li>
                          <li>Transaction signature</li>
                        </ul>
                        <p className="mt-2">
                          These are auto-saved in your browser's localStorage,
                          but you should also copy them to a secure location.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">
                      💡 Pro Tips
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        Longer delays = better privacy (more people mix during
                        that time)
                      </li>
                      <li>
                        Don't withdraw immediately after the delay expires -
                        wait a bit longer
                      </li>
                      <li>
                        Consider mixing multiple smaller amounts instead of one
                        large amount
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "withdrawing" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Withdrawing SOL
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Step-by-Step Withdrawal Guide
                    </h3>
                    <ol className="space-y-4 text-gray-300">
                      <li>
                        <strong className="text-purple-400">
                          1. Switch to Withdraw Tab
                        </strong>
                        <p className="mt-2">
                          Navigate to the "Withdraw" section in the dashboard.
                          You'll see your saved deposits listed.
                        </p>
                      </li>
                      <li>
                        <strong className="text-purple-400">
                          2. Select a Deposit
                        </strong>
                        <p className="mt-2">
                          Click "Load" on a saved deposit to auto-fill your
                          credentials, or manually enter your commitment,
                          secret, and nullifier.
                        </p>
                      </li>
                      <li>
                        <strong className="text-purple-400">
                          3. Enter Recipient Address
                        </strong>
                        <p className="mt-2">
                          Enter the Solana address where you want to receive
                          your funds. This can be any address - a new wallet, an
                          exchange, etc. The system validates the address
                          checksum.
                        </p>
                      </li>
                      <li>
                        <strong className="text-purple-400">
                          4. Check Time Delay
                        </strong>
                        <p className="mt-2">
                          Make sure your chosen time delay has expired. If not,
                          you'll see when withdrawal becomes available.
                        </p>
                      </li>
                      <li>
                        <strong className="text-purple-400">5. Withdraw</strong>
                        <p className="mt-2">
                          Click "Withdraw" and approve the transaction. Your SOL
                          (minus the original mixing fee) will be sent to the
                          recipient address.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-red-400 mb-3">
                      🚨 Critical Security Notes
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        Never reuse the same secret/nullifier - each can only be
                        used once
                      </li>
                      <li>
                        Don't withdraw to an address that's publicly linked to
                        your deposit address
                      </li>
                      <li>
                        Consider using a fresh wallet for withdrawals to
                        maximize privacy
                      </li>
                      <li>
                        The withdrawal transaction can be made from any wallet,
                        not just your deposit wallet
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Security Model
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      How Xorax Protects Your Privacy
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>
                        <strong className="text-purple-400">
                          Cryptographic Commitments:
                        </strong>{" "}
                        Your deposit is represented on-chain only as a hash
                        (commitment). Nobody can determine which deposit belongs
                        to which withdrawal without knowing your secret.
                      </p>
                      <p>
                        <strong className="text-purple-400">
                          Nullifier Tracking:
                        </strong>{" "}
                        The protocol tracks used nullifiers to prevent
                        double-spending, but nullifiers can't be linked back to
                        commitments without knowing the secret.
                      </p>
                      <p>
                        <strong className="text-purple-400">
                          Time Delays:
                        </strong>{" "}
                        Required delays ensure many users deposit and withdraw
                        during the anonymity window, making timing analysis
                        ineffective.
                      </p>
                      <p>
                        <strong className="text-purple-400">
                          Non-Custodial:
                        </strong>{" "}
                        The protocol never controls your funds. Only you have
                        the secret needed to withdraw.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Threat Model & Limitations
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p>
                        <strong className="text-yellow-400">
                          What Xorax protects against:
                        </strong>
                      </p>
                      <ul className="space-y-1 ml-6">
                        <li>
                          ✅ On-chain analysis linking deposits to withdrawals
                        </li>
                        <li>✅ Tracking by wallet explorers</li>
                        <li>✅ Timing analysis (with proper delays)</li>
                        <li>✅ Amount correlation (flexible amounts)</li>
                      </ul>
                      <p className="mt-4">
                        <strong className="text-yellow-400">
                          What Xorax does NOT protect against:
                        </strong>
                      </p>
                      <ul className="space-y-1 ml-6">
                        <li>
                          ❌ Network-level monitoring (use Tor/VPN when
                          interacting)
                        </li>
                        <li>
                          ❌ Browser fingerprinting (use privacy-focused
                          browsers)
                        </li>
                        <li>
                          ❌ Poor operational security (linking addresses
                          off-chain)
                        </li>
                        <li>❌ Compromised endpoints or malicious relayers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">
                      Best Practices for Maximum Privacy
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <LockIcon sx={{ fontSize: 18 }} /> Use Tor Browser or a
                        good VPN
                      </li>
                      <li className="flex items-center gap-2">
                        <AccessTimeIcon sx={{ fontSize: 18 }} /> Use longer time
                        delays (6-24 hours)
                      </li>
                      <li className="flex items-center gap-2">
                        <AttachMoneyIcon sx={{ fontSize: 18 }} /> Mix varying
                        amounts, not round numbers
                      </li>
                      <li className="flex items-center gap-2">
                        <LoopIcon sx={{ fontSize: 18 }} /> Withdraw to
                        completely fresh wallets
                      </li>
                      <li className="flex items-center gap-2">
                        <CalendarTodayIcon sx={{ fontSize: 18 }} /> Don't
                        withdraw immediately when delay expires
                      </li>
                      <li className="flex items-center gap-2">
                        <LockOpenIcon sx={{ fontSize: 18 }} /> Store credentials
                        in encrypted password manager
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "fees" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Fees & Economics
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Fee Structure
                    </h3>
                    <div className="grid gap-4">
                      <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-purple-400 font-semibold">
                            Mixing Fee
                          </span>
                          <span className="text-white font-bold text-xl">
                            0.01 SOL
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Fixed fee per deposit, goes to protocol/relayers
                        </p>
                      </div>

                      <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-purple-400 font-semibold">
                            Gas Fee (Deposit)
                          </span>
                          <span className="text-white font-bold text-xl">
                            ~0.001 SOL
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Solana network fee for deposit transaction
                        </p>
                      </div>

                      <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-purple-400 font-semibold">
                            Gas Fee (Withdraw)
                          </span>
                          <span className="text-white font-bold text-xl">
                            ~0.001 SOL
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Solana network fee for withdrawal transaction
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Example Calculation
                    </h3>
                    <div className="bg-white/5 rounded-xl p-6 space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span>You want to mix:</span>
                        <span className="text-white font-semibold">
                          1.0 SOL
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mixing fee:</span>
                        <span className="text-red-400">- 0.01 SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gas (deposit):</span>
                        <span className="text-red-400">- 0.001 SOL</span>
                      </div>
                      <div className="border-t border-purple-700/50 my-3 pt-3 flex justify-between font-bold">
                        <span>Total cost:</span>
                        <span className="text-white">≈ 1.011 SOL</span>
                      </div>
                      <div className="flex justify-between text-green-400">
                        <span>You will withdraw:</span>
                        <span className="font-bold">≈ 0.999 SOL</span>
                      </div>
                      <p className="text-xs text-gray-500 pt-2">
                        * Withdrawal also requires ~0.001 SOL gas from the
                        recipient wallet
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">
                      Why These Fees?
                    </h4>
                    <p className="text-gray-300">
                      The 0.01 SOL mixing fee covers protocol operations and
                      incentivizes relayers to process withdrawals. Solana's
                      ultra-low gas fees (≈$0.00025) make privacy accessible to
                      everyone, unlike expensive Ethereum-based mixers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "token" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  $XORAX Token
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/50 rounded-2xl border border-purple-700/50 p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <DiamondIcon
                        sx={{ fontSize: 64 }}
                        className="text-yellow-400"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      $XORAX
                    </h3>
                    <p className="text-gray-300 mb-6">
                      The native token of Xorax privacy protocol
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          1,000,000,000
                        </div>
                        <div className="text-gray-400 text-sm">
                          Total Supply
                        </div>
                      </div>
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4">
                        <div className="text-2xl font-bold text-pink-400 mb-1">
                          Pump.fun
                        </div>
                        <div className="text-gray-400 text-sm">
                          Launch Platform
                        </div>
                      </div>
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          100%
                        </div>
                        <div className="text-gray-400 text-sm">Fair Launch</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Token Details
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <BarChartIcon /> Tokenomics
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <strong>Supply:</strong> 1 billion $XORAX (fixed, no
                            inflation)
                          </li>
                          <li>
                            <strong>Distribution:</strong> 100% fair launch on
                            Pump.fun
                          </li>
                          <li>
                            <strong>Network:</strong> Solana SPL Token
                          </li>
                          <li>
                            <strong>Contract:</strong>{" "}
                            9ufweNAGB1vYiB7f1vgELnJnS3LLisMD6GgdMwXQpump
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <RocketLaunchIcon /> Utility (Coming Soon)
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <AttachMoneyIcon sx={{ fontSize: 18 }} /> Reduced
                            mixing fees for $XORAX holders
                          </li>
                          <li className="flex items-center gap-2">
                            <HowToVoteIcon sx={{ fontSize: 18 }} /> Governance
                            rights for protocol upgrades
                          </li>
                          <li className="flex items-center gap-2">
                            <CardGiftcardIcon sx={{ fontSize: 18 }} /> Relayer
                            incentives and staking rewards
                          </li>
                          <li className="flex items-center gap-2">
                            <LocalFireDepartmentIcon sx={{ fontSize: 18 }} />{" "}
                            Potential fee burn mechanism for deflation
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <TrendingUpIcon /> Where to Trade
                        </h4>
                        <p className="mb-3">
                          $XORAX launched on Pump.fun and is tradeable on:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <RocketIcon sx={{ fontSize: 18 }} /> Pump.fun
                          </li>
                          <li className="flex items-center gap-2">
                            <WaterDropIcon sx={{ fontSize: 18 }} /> Raydium
                            (coming soon)
                          </li>
                          <li className="flex items-center gap-2">
                            <RocketLaunchIcon sx={{ fontSize: 18 }} /> Jupiter
                            Aggregator
                          </li>
                          <li className="flex items-center gap-2">
                            <DiamondIcon sx={{ fontSize: 18 }} /> Other Solana
                            DEXs
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <WarningIcon /> Disclaimer
                    </h4>
                    <p className="text-gray-300 text-sm">
                      $XORAX is a utility token for the Xorax protocol. This is
                      not financial advice. Always do your own research before
                      purchasing any cryptocurrency. Token price is highly
                      volatile and you may lose your entire investment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "technical" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Technical Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Smart Contract Architecture
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Xorax is built as a Solana program (smart contract) using
                      the Anchor framework. The program handles deposits,
                      withdrawals, and tracks used nullifiers.
                    </p>
                    <div className="bg-white/5 rounded-xl p-6 space-y-4 text-gray-300">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Core Program Functions
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <code className="text-purple-400">deposit()</code> -
                            Accept SOL with commitment and delay
                          </li>
                          <li>
                            <code className="text-purple-400">withdraw()</code>{" "}
                            - Verify credentials and send to recipient
                          </li>
                          <li>
                            <code className="text-purple-400">
                              verify_commitment()
                            </code>{" "}
                            - Check secret + nullifier hash matches commitment
                          </li>
                          <li>
                            <code className="text-purple-400">
                              check_nullifier()
                            </code>{" "}
                            - Ensure nullifier not previously used
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Cryptographic Implementation
                    </h3>
                    <div className="bg-white/5 rounded-xl p-6 space-y-4 text-gray-300">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Commitment Scheme
                        </h4>
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm">
                          {`commitment = Keccak256(secret || nullifier)
secret = 32 random bytes
nullifier = 32 random bytes`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Withdrawal Verification
                        </h4>
                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm">
                          {`1. Verify: Keccak256(secret || nullifier) == commitment
2. Check: nullifier not in used_nullifiers set
3. Check: current_time >= deposit_time + delay
4. Transfer: amount - mixing_fee to recipient
5. Mark: nullifier as used`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      On-Chain Data Structures
                    </h3>
                    <div className="bg-white/5 rounded-xl p-6 space-y-3 text-gray-300">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Deposit Account
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• commitment: [u8; 32]</li>
                          <li>• amount: u64</li>
                          <li>• deposit_time: i64</li>
                          <li>• delay_seconds: u32</li>
                          <li>• withdrawn: bool</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Nullifier Registry
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• nullifier_hash: [u8; 32]</li>
                          <li>• used: bool</li>
                          <li>• timestamp: i64</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">
                      🔓 Open Source
                    </h4>
                    <p className="text-gray-300 mb-3">
                      Xorax is fully open source. You can audit the smart
                      contract code, frontend, and all cryptographic
                      implementations on GitHub.
                    </p>
                    <a
                      href="#"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "sdk" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  SDK & API Integration
                </h2>

                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    📦 Xorax SDK on npm
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Integrate Xorax privacy mixer into your own applications
                    with our official TypeScript SDK.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.npmjs.com/package/xorax-sdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform"
                    >
                      View on npm →
                    </a>
                    <a
                      href="https://github.com/XoraxProtocol/xorax-sdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-white/10 border border-purple-600 rounded-full text-white font-semibold hover:bg-white/20 transition"
                    >
                      GitHub Repo →
                    </a>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Installation
                    </h3>
                    <div className="bg-black/50 rounded-xl p-6">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`# Using npm
npm install xorax-sdk

# Using yarn
yarn add xorax-sdk

# Using pnpm
pnpm add xorax-sdk`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Quick Start
                    </h3>
                    <div className="bg-black/50 rounded-xl p-6">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`import { XoraxClient, generateSecret, generateNullifier, computeCommitment } from 'xorax-sdk';
import { Connection, clusterApiUrl } from '@solana/web3.js';

// Initialize client
const connection = new Connection(clusterApiUrl('devnet'));
const client = new XoraxClient(connection, wallet);

// Generate credentials
const secret = generateSecret();
const nullifier = generateNullifier();
const commitment = computeCommitment(secret, nullifier);

// Deposit SOL
const depositTx = await client.deposit(
  commitment,
  0.5, // 0.5 SOL
  3600 // 1 hour delay
);

// Withdraw later
const withdrawTx = await client.withdrawDirect(
  secret,
  nullifier,
  recipientAddress,
  0.48 // amount minus fees
);`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Core Methods
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          <code className="text-purple-400">
                            deposit(commitment, amount, delay)
                          </code>
                        </h4>
                        <p className="text-gray-300 mb-3">
                          Deposit SOL into the mixer with a cryptographic
                          commitment.
                        </p>
                        <ul className="space-y-1 text-sm text-gray-400">
                          <li>
                            • <strong>commitment</strong>: Buffer - 32-byte
                            commitment hash
                          </li>
                          <li>
                            • <strong>amount</strong>: number - Amount in SOL
                            (0.1 to 10+)
                          </li>
                          <li>
                            • <strong>delay</strong>: number - Time delay in
                            seconds
                          </li>
                          <li>
                            • <strong>Returns</strong>: Promise&lt;string&gt; -
                            Transaction signature
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          <code className="text-purple-400">
                            withdrawDirect(secret, nullifier, recipient, amount)
                          </code>
                        </h4>
                        <p className="text-gray-300 mb-3">
                          Withdraw directly to any Solana address.
                        </p>
                        <ul className="space-y-1 text-sm text-gray-400">
                          <li>
                            • <strong>secret</strong>: Buffer - 32-byte secret
                          </li>
                          <li>
                            • <strong>nullifier</strong>: Buffer - 32-byte
                            nullifier
                          </li>
                          <li>
                            • <strong>recipient</strong>: PublicKey -
                            Destination address
                          </li>
                          <li>
                            • <strong>amount</strong>: number - Amount to
                            withdraw in SOL
                          </li>
                          <li>
                            • <strong>Returns</strong>: Promise&lt;string&gt; -
                            Transaction signature
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          <code className="text-purple-400">
                            canWithdraw(secret, nullifier)
                          </code>
                        </h4>
                        <p className="text-gray-300 mb-3">
                          Check if a deposit is ready to withdraw.
                        </p>
                        <ul className="space-y-1 text-sm text-gray-400">
                          <li>
                            • <strong>Returns</strong>: Promise&lt;boolean&gt; -
                            True if withdrawal is allowed
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Cryptographic Utilities
                    </h3>
                    <div className="bg-white/5 rounded-xl p-6">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`import { generateSecret, generateNullifier, computeCommitment } from 'xorax-sdk';

// Generate random 32-byte secret
const secret = generateSecret();
// Output: Buffer<32 bytes>

// Generate random 32-byte nullifier
const nullifier = generateNullifier();
// Output: Buffer<32 bytes>

// Compute commitment hash
const commitment = computeCommitment(secret, nullifier);
// Output: Buffer<32 bytes> - SHA256(secret || nullifier)`}</code>
                      </pre>
                      <p className="text-gray-400 text-sm mt-4">
                        ⚠️ <strong>Important:</strong> Store secret and
                        nullifier securely! You need both to withdraw funds.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      React Example
                    </h3>
                    <div className="bg-black/50 rounded-xl p-6">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{`import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { XoraxClient, generateSecret, generateNullifier, computeCommitment } from 'xorax-sdk';
import { useState } from 'react';

function DepositForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [amount, setAmount] = useState('0.5');
  const [delay, setDelay] = useState('3600');
  
  const handleDeposit = async () => {
    const client = new XoraxClient(connection, wallet);
    
    // Generate credentials
    const secret = generateSecret();
    const nullifier = generateNullifier();
    const commitment = computeCommitment(secret, nullifier);
    
    // Save credentials securely
    localStorage.setItem('xorax_secret', secret.toString('hex'));
    localStorage.setItem('xorax_nullifier', nullifier.toString('hex'));
    
    // Execute deposit
    const signature = await client.deposit(
      commitment,
      parseFloat(amount),
      parseInt(delay)
    );
    
    console.log('Deposit successful:', signature);
  };
  
  return (
    <div>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (SOL)"
      />
      <input 
        type="number" 
        value={delay} 
        onChange={(e) => setDelay(e.target.value)}
        placeholder="Delay (seconds)"
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">
                      📚 Full Documentation
                    </h4>
                    <p className="text-gray-300 mb-4">
                      For complete API reference, examples, and best practices,
                      visit the SDK repository.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="https://github.com/XoraxProtocol/xorax-sdk#readme"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform"
                      >
                        Read Full Docs →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "faq" && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Is Xorax safe to use?
                    </h3>
                    <p className="text-gray-300">
                      Yes, Xorax is non-custodial (you control your keys) and
                      uses proven cryptographic techniques. However, no privacy
                      tool is perfect. Follow best practices and use additional
                      privacy tools (Tor/VPN) for maximum protection.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      What happens if I lose my secret and nullifier?
                    </h3>
                    <p className="text-gray-300">
                      Your funds are permanently locked. There is no way to
                      recover them without these credentials. Always back them
                      up in multiple secure locations!
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      How much privacy does Xorax provide?
                    </h3>
                    <p className="text-gray-300">
                      Xorax breaks the on-chain link between deposits and
                      withdrawals. The level of anonymity depends on: (1) how
                      many other users mix during your time delay, (2) whether
                      you use good operational security (Tor, fresh wallets,
                      etc.), and (3) your chosen time delay length.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Can I cancel a deposit and get a refund?
                    </h3>
                    <p className="text-gray-300">
                      No, deposits are final. Once you deposit, you must wait
                      for the time delay and then withdraw. There's no cancel
                      function for security reasons.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Why do I need to wait for a time delay?
                    </h3>
                    <p className="text-gray-300">
                      Time delays ensure that many users deposit and withdraw
                      during the same period, creating an anonymity set. Without
                      delays, it would be trivial to link deposits to
                      withdrawals based on timing.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Is Xorax legal?
                    </h3>
                    <p className="text-gray-300">
                      Privacy tools are legal in most jurisdictions. Xorax is
                      designed for legitimate privacy use cases. However, you
                      are responsible for complying with your local laws and
                      regulations.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Can I use Xorax from a centralized exchange (CEX)?
                    </h3>
                    <p className="text-gray-300">
                      Not recommended. CEXs track all deposits/withdrawals and
                      may flag privacy mixer transactions. For best privacy,
                      withdraw from CEX to a personal wallet first, then use
                      Xorax.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      What's the difference between Xorax and other mixers?
                    </h3>
                    <p className="text-gray-300">
                      Xorax offers flexible amounts (not fixed pools), runs on
                      fast/cheap Solana (not slow/expensive Ethereum), and is
                      fully non-custodial with open relayers. Plus, it's powered
                      by the $XORAX token community.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      How does $XORAX token benefit me?
                    </h3>
                    <p className="text-gray-300">
                      $XORAX holders will receive reduced mixing fees,
                      governance voting rights, and potential staking rewards in
                      future protocol updates. Details will be announced as
                      features roll out.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-700/30 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Mixing?
              </h3>
              <p className="text-gray-300 mb-6">
                Protect your privacy on Solana with Xorax
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform"
              >
                Launch Xorax App →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
