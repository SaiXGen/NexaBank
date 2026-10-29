'use client';

import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Cpu,
  Webhook,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useToast } from '@/context/ToastContext';

export default function DevelopersPage() {
  const { addToast } = useToast();
  const [activeSnippet, setActiveSnippet] = useState<'connect' | 'readScore' | 'requestLoan' | 'getTxs'>('readScore');
  const [copied, setCopied] = useState(false);

  const snippets = {
    connect: `// 1. Initialize NexaFi Web3 SDK
import { NexaClient, createConfig } from '@nexafi/sdk';
import { arbitrum, mainnet } from 'viem/chains';

const client = new NexaClient({
  apiKey: process.env.NEXAFI_PUBLIC_KEY,
  chains: [mainnet, arbitrum],
});

// Authenticate via SIWE (Sign-In with Ethereum)
const session = await client.connectWallet({
  provider: window.ethereum,
});

console.log('Connected user:', session.address, session.ensName);`,

    readScore: `// 2. Fetch Verified On-Chain Nexa Trust Score
import { NexaTrustOracle } from '@nexafi/sdk';

const oracle = new NexaTrustOracle();
const profile = await oracle.getTrustProfile('0x71C83e58b142828bF93F2');

console.log({
  score: profile.overallScore, // 842
  tier: profile.ratingTier,    // "Excellent"
  uncollateralizedLimit: profile.maxCreditLine, // $8,500 USDC
  factors: profile.factors,
});`,

    requestLoan: `// 3. Request Undercollateralized Loan from Pool
import { NexaLendingPool } from '@nexafi/sdk';

const pool = new NexaLendingPool({ chainId: 42161 }); // Arbitrum One

const tx = await pool.requestTrustLoan({
  principalAmount: 2500, // 2,500 USDC
  durationDays: 90,
  purpose: 'Compute infrastructure scaling',
  trustScoreProof: profile.zkProof,
});

await tx.wait();
console.log('Loan originated on-chain:', tx.hash);`,

    getTxs: `// 4. Query Forensic Transaction History & Categorization
import { NexaLedger } from '@nexafi/sdk';

const ledger = new NexaLedger();
const history = await ledger.getAccountTransactions({
  address: '0x71C83e58b142828bF93F2',
  category: 'Lending',
  limit: 20,
});

console.log('Recent ledger events:', history.records);`,
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Code Copied',
      message: 'Snippet copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
              <Code2 className="w-3.5 h-3.5" />
              NexaFi Developer Ecosystem
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Build with NexaFi Protocols
            </h1>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Integrate decentralized credit, query verifiable trust scores, and embed community risk circles into any Web3 application using our TypeScript SDK and Solidity interfaces.
            </p>
          </div>

          {/* 4 Core Pillars for Devs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-14">
            <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08]">
              <Terminal className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold text-white">NexaFi SDK</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero-config TypeScript SDK with Viem and Wagmi bindings for modern dApps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08]">
              <Cpu className="w-6 h-6 text-indigo-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Smart Contracts</h3>
              <p className="text-xs text-slate-400 mt-1">
                Standard Solidity interfaces (`ITrustScore`, `ITrustCircle`, `ILendingPool`).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08]">
              <Layers className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-sm font-bold text-white">REST & RPC APIs</h3>
              <p className="text-xs text-slate-400 mt-1">
                Low-latency endpoints for scores, portfolio valuations, and risk analytics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08]">
              <Webhook className="w-6 h-6 text-amber-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Real-Time Webhooks</h3>
              <p className="text-xs text-slate-400 mt-1">
                Receive instant notifications on loan repayments, score adjustments, and pool events.
              </p>
            </div>
          </div>

          {/* Interactive Code Explorer */}
          <div className="rounded-3xl bg-[#0A0D15] border border-white/10 shadow-2xl overflow-hidden mb-16">
            {/* Snippet Tabs */}
            <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0E131E]">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'connect', label: '1. Connect Wallet' },
                  { id: 'readScore', label: '2. Read Trust Score' },
                  { id: 'requestLoan', label: '3. Request Loan' },
                  { id: 'getTxs', label: '4. Get Transactions' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSnippet(item.id as typeof activeSnippet)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeSnippet === item.id
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyCode(snippets[activeSnippet])}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code View */}
            <div className="p-6 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto bg-[#07090E] leading-relaxed">
              <pre>{snippets[activeSnippet]}</pre>
            </div>
          </div>

          {/* Installation & Quickstart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08]">
              <h3 className="text-sm font-bold text-white mb-2">Package Installation</h3>
              <p className="text-xs text-slate-400 mb-4">Add the NexaFi SDK to your Next.js or React app:</p>
              <div className="p-3.5 rounded-xl bg-[#080A0F] border border-white/10 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <span>npm install @nexafi/sdk viem wagmi</span>
                <button
                  onClick={() => copyCode('npm install @nexafi/sdk viem wagmi')}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Solidity Interface Contracts</h3>
                <p className="text-xs text-slate-400">
                  Import `ITrustScore.sol` and `ITrustCircle.sol` directly into your Hardhat or Foundry projects.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-300">
                <span>View on GitHub / ABI Registry</span>
                <span className="text-emerald-400 font-semibold">contracts/ →</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
