"use client";

import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PublicIcon from "@mui/icons-material/Public";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DiamondIcon from "@mui/icons-material/Diamond";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import SplashCursor from "../components/SplashCursor";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-black to-purple-950">
      <SplashCursor />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12 lg:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-transparent">
              <img
                src="/xorax_logo.png"
                alt="Xorax Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white">
              Xorax
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition"
            >
              How It Works
            </a>
            <a
              href="#roadmap"
              className="text-gray-300 hover:text-white transition"
            >
              Roadmap
            </a>
            <a
              href="/docs"
              className="text-gray-300 hover:text-white transition"
            >
              Docs
            </a>
            <a
              href="/dashboard"
              className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition"
            >
              Launch App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-purple-900/20 rounded-lg transition"
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
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mb-8 bg-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-800/30 p-4 space-y-3">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition py-2 px-4 rounded-lg hover:bg-purple-900/20"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition py-2 px-4 rounded-lg hover:bg-purple-900/20"
            >
              How It Works
            </a>
            <a
              href="#roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition py-2 px-4 rounded-lg hover:bg-purple-900/20"
            >
              Roadmap
            </a>
            <a
              href="/docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition py-2 px-4 rounded-lg hover:bg-purple-900/20"
            >
              Docs
            </a>
            <a
              href="/dashboard"
              className="block text-center px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition"
            >
              Launch App
            </a>
          </div>
        )}

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 rounded-full text-purple-300 text-xs lg:text-sm mb-4 lg:mb-6 border border-purple-700">
            <LockIcon sx={{ fontSize: 16 }} /> Privacy-First Solana Mixer
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight px-4">
            Mix Your SOL,
            <br />
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Keep Your Privacy
            </span>
          </h1>
          <p className="text-base lg:text-xl text-gray-300 mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
            Xorax is a non-custodial privacy mixer on Solana. Break on-chain
            links between deposits and withdrawals using cryptographic
            commitments. Mix any amount with flexible time delays. Powered by
            $XORAX token.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
            <a
              href="/dashboard"
              className="px-6 lg:px-8 py-3 lg:py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-base lg:text-lg hover:scale-105 transition-transform"
            >
              Start Mixing Now
            </a>
            <a
              href="#how-it-works"
              className="px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-base lg:text-lg hover:bg-white/20 transition"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-12 lg:mt-20 max-w-3xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">
                1000+
              </div>
              <div className="text-gray-400 text-xs lg:text-base">
                Total Mixes
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">
                Any
              </div>
              <div className="text-gray-400 text-xs lg:text-base">
                Amount Size
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">
                100%
              </div>
              <div className="text-gray-400 text-xs lg:text-base">
                Decentralized
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-20 lg:mb-32">
          <div className="text-center mb-12 lg:mb-16 px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Xorax?
            </h2>
            <p className="text-gray-400 text-base lg:text-lg">
              Privacy should be easy, not complicated
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 px-4">
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <AttachMoneyIcon sx={{ fontSize: 28 }} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                Flexible Amounts
              </h3>
              <p className="text-gray-400 text-sm lg:text-base">
                Mix any amount you want - from 0.1 SOL to 10+ SOL. Quick select
                buttons or enter your custom amount.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <AccessTimeIcon sx={{ fontSize: 28 }} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                Flexible Delays
              </h3>
              <p className="text-gray-400 text-sm lg:text-base">
                Set your own withdrawal delay from 5 minutes to 24 hours. More
                time = more privacy.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <PublicIcon sx={{ fontSize: 28 }} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                Open Relayers
              </h3>
              <p className="text-gray-400 text-sm lg:text-base">
                Anyone can act as a relayer. Decentralized network means no
                single point of failure.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <LockOpenIcon sx={{ fontSize: 28 }} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                Cryptographic Privacy
              </h3>
              <p className="text-gray-400 text-sm lg:text-base">
                Uses commitment schemes with secret + nullifier. Your withdrawal
                cannot be linked to your deposit.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <DiamondIcon sx={{ fontSize: 28 }} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                Low Fees
              </h3>
              <p className="text-gray-400 text-sm lg:text-base">
                Only 0.01 SOL mixing fee + minimal gas. No hidden costs,
                completely transparent.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition">
              <div className="w-12 lg:w-14 h-12 lg:h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                <BoltIcon sx={{ fontSize: 28 }} className="text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                Solana Speed
              </h3>
              <p className="text-gray-400 text-sm lg:text-base">
                Built on Solana for fast confirmations and low transaction
                costs. Privacy shouldn't be expensive.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-20 lg:mb-32 px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-base lg:text-lg">
              Three simple steps to private transactions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12">
            <div className="flex gap-4 lg:gap-6 items-start">
              <div className="shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">
                  Deposit & Mix
                </h3>
                <p className="text-gray-400 text-sm lg:text-lg">
                  Select your amount and time delay. Deposit your SOL with a
                  cryptographic commitment. The protocol generates a secret and
                  nullifier that only you control.
                </p>
              </div>
            </div>

            <div className="flex gap-4 lg:gap-6 items-start">
              <div className="shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">
                  Wait for Privacy
                </h3>
                <p className="text-gray-400 text-sm lg:text-lg">
                  Your chosen delay timer starts. During this time, more people
                  deposit and withdraw, making it impossible to trace which
                  deposit belongs to which withdrawal.
                </p>
              </div>
            </div>

            <div className="flex gap-4 lg:gap-6 items-start">
              <div className="shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">
                  Withdraw Anywhere
                </h3>
                <p className="text-gray-400 text-sm lg:text-lg">
                  After the delay, withdraw to any address you want. The
                  on-chain link between your deposit and withdrawal is
                  completely broken. Your privacy is restored.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SDK Section */}
        <section className="mb-20 lg:mb-32 px-4">
          <div className="bg-linear-to-br from-indigo-900/70 to-purple-900/50 rounded-3xl border border-indigo-700/50 p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 lg:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-xs lg:text-sm mb-4 lg:mb-6 border border-indigo-500/30">
                  <CodeIcon sx={{ fontSize: 16 }} /> Developer Tools
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                  Build with Xorax SDK
                </h2>
                <p className="text-base lg:text-xl text-gray-300 mb-6 lg:mb-8">
                  Integrate privacy mixing into your applications with our
                  official TypeScript SDK v1.1.0. Now live on Solana mainnet and
                  published on npm.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-indigo-800/30">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <BoltIcon className="text-indigo-400" /> Quick Install
                  </h3>
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <code className="text-sm text-indigo-300">
                      npm install xorax-sdk
                    </code>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Latest v1.1.0 with mainnet support
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-indigo-800/30">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>✅ Mainnet & Devnet support</li>
                    <li>✅ Complete TypeScript types</li>
                    <li>✅ Browser & Node.js compatible</li>
                    <li>✅ Crypto utilities included</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Quick Start Example
                </h3>
                <pre className="overflow-x-auto text-sm text-gray-300">
                  <code>{`import { XoraxClient } from 'xorax-sdk';
import { Connection } from '@solana/web3.js';

// Connect to mainnet
const connection = new Connection('https://api.mainnet-beta.solana.com');
const client = new XoraxClient(connection, wallet);

// Deposit 0.5 SOL with 1 hour delay
await client.deposit(0.5, 3600);`}</code>
                </pre>
              </div>

              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
                  <a
                    href="https://www.npmjs.com/package/xorax-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full text-white font-semibold text-base lg:text-lg hover:scale-105 transition-transform"
                  >
                    View on npm →
                  </a>
                  <a
                    href="https://github.com/XoraxProtocol/xorax-sdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-base lg:text-lg hover:bg-white/20 transition"
                  >
                    GitHub Repo →
                  </a>
                  <a
                    href="/docs#sdk"
                    className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-base lg:text-lg hover:bg-white/20 transition"
                  >
                    Read Docs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token Section */}
        <section className="mb-20 lg:mb-32 px-4">
          <div className="bg-linear-to-br from-purple-900/70 to-pink-900/50 rounded-3xl border border-purple-700/50 p-8 lg:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300 text-xs lg:text-sm mb-4 lg:mb-6 border border-yellow-500/30">
              <DiamondIcon sx={{ fontSize: 16 }} /> $XORAX Token
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
              Powered by $XORAX
            </h2>
            <p className="text-base lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-3xl mx-auto">
              The native token of Xorax protocol with 1 billion total supply.
              Launched on Pump.fun and trading on Solana.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-3xl mx-auto mb-8">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-purple-800/30">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">
                  1B
                </div>
                <div className="text-gray-400 text-sm lg:text-base">
                  Total Supply
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-purple-800/30">
                <div className="text-3xl lg:text-4xl font-bold text-pink-400 mb-2">
                  Pump.fun
                </div>
                <div className="text-gray-400 text-sm lg:text-base">
                  Launched On
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-purple-800/30">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">
                  100%
                </div>
                <div className="text-gray-400 text-sm lg:text-base">
                  Community
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <a
                href="#"
                className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-linear-to-r from-yellow-600 to-orange-600 rounded-full text-white font-semibold text-base lg:text-lg hover:scale-105 transition-transform"
              >
                Buy $XORAX
              </a>
              <a
                href="#"
                className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-base lg:text-lg hover:bg-white/20 transition"
              >
                View Chart
              </a>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="mb-20 lg:mb-32 px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Roadmap
            </h2>
            <p className="text-gray-400 text-base lg:text-lg">
              Building the future of privacy on Solana
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Q4 2025 */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-semibold border border-green-500/30">
                  ✓ COMPLETED
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Q4 2025 - Launch
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Core protocol deployment on Solana mainnet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Web interface launch with deposit & withdraw</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>$XORAX token launch on Pump.fun</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>TypeScript SDK v1.1.0 published on npm</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Relayer infrastructure for gasless withdrawals</span>
                </li>
              </ul>
            </div>

            {/* Q1 2026 */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm font-semibold border border-blue-500/30">
                  PLANNED
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Q1 2026 - Growth
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">○</span>
                  <span>Community growth & marketing campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">○</span>
                  <span>Strategic partnerships & integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">○</span>
                  <span>Security audit & bug bounty program</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">○</span>
                  <span>Enhanced analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">○</span>
                  <span>Performance optimizations</span>
                </li>
              </ul>
            </div>

            {/* Q2 2026 */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-semibold border border-purple-500/30">
                  PLANNED
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Q2 2026 - Expansion
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Multi-token support (USDC, USDT)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Mobile applications (iOS & Android)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Decentralized relayer network expansion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Major wallet integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Developer grants program</span>
                </li>
              </ul>
            </div>

            {/* Q3 2026 */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-semibold border border-purple-500/30">
                  PLANNED
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Q3 2026 - Ecosystem
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>DeFi protocol integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Governance DAO with $XORAX staking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Privacy pools & shared anonymity sets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Cross-chain bridge integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">○</span>
                  <span>Advanced privacy features</span>
                </li>
              </ul>
            </div>

            {/* Q4 2025 */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm font-semibold border border-blue-500/30">
                  IN PROGRESS
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Q4 2025 - Current Phase
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Community growth & adoption campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Strategic partnerships & integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Performance optimizations & bug fixes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Enhanced relayer network infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>User experience improvements</span>
                </li>
              </ul>
            </div>

            {/* 2026 */}
            <div className="bg-white/5 backdrop-blur border border-purple-800/30 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-400 text-sm font-semibold border border-pink-500/30">
                  FUTURE
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  2026 - Advanced Features
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">○</span>
                  <span>Multi-token support (USDC, USDT, and more)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">○</span>
                  <span>Mobile applications (iOS & Android)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">○</span>
                  <span>zk-SNARK integration for enhanced privacy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">○</span>
                  <span>DeFi protocol integrations & composability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">○</span>
                  <span>Governance DAO with $XORAX staking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">○</span>
                  <span>Cross-chain privacy solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 lg:py-20 bg-linear-to-r from-purple-900/50 to-pink-900/50 rounded-3xl border border-purple-700/30 mx-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6 px-4">
            Ready to Mix?
          </h2>
          <p className="text-base lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
            Join hundreds of users protecting their privacy on Solana. Start
            mixing in under a minute.
          </p>
          <a
            href="/dashboard"
            className="inline-block px-6 lg:px-8 py-3 lg:py-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-base lg:text-lg hover:scale-105 transition-transform"
          >
            Launch Xorax App →
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-20 lg:mt-32 pt-8 lg:pt-12 border-t border-purple-900/50 text-center text-gray-500 px-4">
          <p className="mb-4 text-sm lg:text-base">
            © 2025 Xorax. Open source privacy mixer on Solana.
          </p>
          <div className="flex gap-4 lg:gap-6 justify-center text-sm lg:text-base">
            <a
              href="https://github.com/XoraxProtocol"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              GitHub
            </a>
            <a href="/docs" className="hover:text-purple-400 transition">
              Docs
            </a>
            <a
              href="https://x.com/xoraxprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              Twitter
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
