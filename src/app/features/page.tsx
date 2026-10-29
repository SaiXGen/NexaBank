'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wallet,
  ShieldCheck,
  Users,
  Coins,
  PieChart,
  Bot,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function FeaturesPage() {
  const pillars = [
    {
      id: 'account',
      icon: Wallet,
      tag: '01. Sovereign Foundation',
      title: 'Web3 Account & Asset Management',
      description:
        'A digital banking experience that lives entirely in self-custody. Consolidate your balances across Ethereum, Arbitrum, Base, and Polygon without transferring keys to a middleman.',
      benefits: [
        'Single aggregated net worth dashboard',
        'Direct fiat on-ramp simulation (Card, Bank, Apple Pay)',
        'Zero-gas L2 transfers with human-readable ENS lookup',
        'Multi-token swap routing with minimal slippage',
      ],
      linkText: 'Explore Wallet',
      href: '/wallet',
    },
    {
      id: 'score',
      icon: ShieldCheck,
      tag: '02. Verifiable Reputation',
      title: 'Nexa Trust Score (842 / 1000)',
      description:
        'Your on-chain financial history becomes your portable reputation. Algorithmic factor analysis evaluates payment reliability, wallet longevity, liquidity stability, and community endorsements.',
      benefits: [
        'Transparent 5-factor scoring model with public weights',
        'Zero reliance on centralized bureau databases or private data scraping',
        'Instant credit line pre-approvals governed by smart contracts',
        'Score rewards for every on-time loan installment repaid',
      ],
      linkText: 'View Trust Score',
      href: '/trust-score',
    },
    {
      id: 'circles',
      icon: Users,
      tag: '03. Community Underwriting',
      title: 'Trust Circles & Social Guarantees',
      description:
        'Form or join cohorts of verified Web3 builders, founders, and security researchers. Members stake mutual guarantees into a shared pool, co-underwriting each other’s loans.',
      benefits: [
        'Peer-backed risk sharing eliminates need for heavy collateral',
        'Transparent member reputation and stake contribution tables',
        'Community governance over admission and risk thresholds',
        'Earn pool yield on staked guarantees while members repay',
      ],
      linkText: 'Explore Trust Circles',
      href: '/trust-circles',
    },
    {
      id: 'lending',
      icon: Coins,
      tag: '04. Efficient Capital',
      title: 'Decentralized Lending & Credit Lines',
      description:
        'Borrow working capital based on your Trust Score tier instead of locking up 150% in crypto collateral. Retain your upside on ETH and BTC while borrowing liquid USDC.',
      benefits: [
        'Uncollateralized credit limits up to $15,000 for high-trust profiles',
        'Predictable fixed APRs from 4.8% without liquidation traps',
        'Flexible 30, 60, 90, or 180-day repayment durations',
        'Instant smart-contract disbursement with 1-click repayments',
      ],
      linkText: 'View Lending Facilities',
      href: '/lending',
    },
    {
      id: 'portfolio',
      icon: PieChart,
      tag: '05. Deep Telemetry',
      title: 'Portfolio Intelligence & Analytics',
      description:
        'Real-time forensic visualization of your net worth trajectory, asset allocation donut charts, historical PnL curves, and tax-lot categorized ledger entries.',
      benefits: [
        'Interactive Recharts area graphs across 7D, 30D, 90D, and 1Y',
        'Target diversification breakdowns with volatility health gauges',
        'Filterable transactions ledger with instant CSV tax export',
        'Cryptographic hash inspections with block confirmation details',
      ],
      linkText: 'View Portfolio Intelligence',
      href: '/portfolio',
    },
    {
      id: 'ai',
      icon: Bot,
      tag: '06. Financial Intelligence',
      title: 'Nexa AI Copilot',
      description:
        'A dedicated financial reasoning assistant with direct awareness of your on-chain positions. Ask natural-language questions about your spending, credit limits, or score changes.',
      benefits: [
        'Automated detection of score improvements and rate discounts',
        'Forensic explanations of complex DEX swaps and transaction traces',
        'Spending category categorizations and gas fee optimizations',
        'Extensible architecture ready for external LLM API integration',
      ],
      linkText: 'Chat with Nexa AI',
      href: '/ai-assistant',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Protocol Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              A Complete Financial Operating System
            </h1>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore the six core pillars that make NexaFi the most trusted bridge between modern fintech banking and decentralized finance.
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-12">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-8 sm:p-10 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-xl hover:border-white/20 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                        {pillar.tag}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        {pillar.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors border border-white/10"
                      >
                        <span>{pillar.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      </Link>
                    </div>

                    <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141B29] border border-white/5 space-y-3">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                        Key Capabilities & Architecture
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pillar.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
