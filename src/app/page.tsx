'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wallet,
  Users,
  Coins,
  PieChart,
  Bot,
  Lock,
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroDashboardPreview } from '@/components/landing/HeroDashboardPreview';

export default function LandingPage() {
  const features = [
    {
      icon: Wallet,
      title: 'Web3 Account',
      description:
        'Connect and manage your wallet from a unified financial dashboard with multi-chain asset aggregation and frictionless fiat on-ramps.',
      tag: 'Self-Custody',
      color: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
      href: '/wallet',
    },
    {
      icon: ShieldCheck,
      title: 'Nexa Trust Score',
      description:
        'A transparent, verifiable score based on multi-factor on-chain behavior, payment reliability, and liquidity history.',
      tag: 'Identity',
      color: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      href: '/trust-score',
    },
    {
      icon: Users,
      title: 'Trust Circles',
      description:
        'Create or join communities where members establish mutual financial trust, co-guarantee loans, and lower borrowing costs.',
      tag: 'Social Underwriting',
      color: 'from-purple-500/20 to-indigo-500/20',
      iconColor: 'text-purple-400',
      href: '/trust-circles',
    },
    {
      icon: Coins,
      title: 'Decentralized Lending',
      description:
        'Request loans based on trust and eligibility instead of relying solely on heavy over-collateralization or traditional credit bureaus.',
      tag: 'Low-Collateral Credit',
      color: 'from-emerald-500/20 to-emerald-600/20',
      iconColor: 'text-emerald-300',
      href: '/lending',
    },
    {
      icon: PieChart,
      title: 'Portfolio Intelligence',
      description:
        'Track multi-token balances, performance curves, cash flows, and detailed forensic ledger breakdowns in real time.',
      tag: 'Analytics',
      color: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
      href: '/portfolio',
    },
    {
      icon: Bot,
      title: 'AI Financial Copilot',
      description:
        'Ask questions about your portfolio, analyze contract risks, understand transaction histories, and optimize your credit profile.',
      tag: 'Intelligence',
      color: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      href: '/ai-assistant',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Connect Wallet',
      description:
        'Link your MetaMask, Coinbase Wallet, or explore instantly with our preloaded zero-setup Demo Account.',
    },
    {
      num: '02',
      title: 'Build Your Trust Profile',
      description:
        'NexaFi verifies historical on-chain transactions, steady liquidity reserves, and contract interactions.',
    },
    {
      num: '03',
      title: 'Unlock Financial Opportunities',
      description:
        'Access uncollateralized credit lines, join verified Trust Circles, and tap into curated decentralized yield.',
    },
    {
      num: '04',
      title: 'Manage Your Web3 Finance',
      description:
        'Send, swap, borrow, and track performance with the oversight of your dedicated Nexa AI financial assistant.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
          {/* Subtle grid and radial gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(#141B29_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 mb-6 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">NexaFi Protocol v1.0 Live</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-mono">Sepolia & Arbitrum</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
              Build Financial Trust{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                On-Chain.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              NexaFi combines Web3 wallets, decentralized credit, and intelligent financial insights into one secure financial account.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-2 group"
              >
                <span>Launch NexaFi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-sm border border-white/[0.08] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Platform</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Large Interactive Dashboard Preview */}
            <div className="mt-14 sm:mt-18">
              <HeroDashboardPreview />
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-20 border-y border-white/[0.06] bg-[#0A0D15] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Decentralized On-Chain Reputation
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Your on-chain behavior becomes your financial reputation.
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                NexaFi creates an objective, decentralized trust profile from verifiable financial activity. No centralized gatekeepers, no opaque algorithms.
              </p>
            </div>

            {/* Formula / Trust Equation Visual */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#101623] border border-white/[0.08] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 sm:gap-6 text-center">
                {/* 1. Wallet Activity */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#141B29] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Wallet Activity</h4>
                  <p className="text-xs text-slate-400 mt-1">620+ days history & multi-contract volume</p>
                  <span className="mt-2 inline-block text-[11px] font-mono text-emerald-400 font-bold">84%</span>
                </div>

                <div className="text-2xl font-bold text-slate-600 hidden md:block">+</div>

                {/* 2. Repayment History */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#141B29] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Repayment History</h4>
                  <p className="text-xs text-slate-400 mt-1">100% on-time debt settlement</p>
                  <span className="mt-2 inline-block text-[11px] font-mono text-emerald-400 font-bold">92%</span>
                </div>

                <div className="text-2xl font-bold text-slate-600 hidden md:block">+</div>

                {/* 3. Trust Circle */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#141B29] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Trust Circle</h4>
                  <p className="text-xs text-slate-400 mt-1">Peer endorsements & staked guarantees</p>
                  <span className="mt-2 inline-block text-[11px] font-mono text-emerald-400 font-bold">79%</span>
                </div>
              </div>

              {/* Equation Result Divider */}
              <div className="my-8 flex items-center justify-center gap-4">
                <div className="h-px bg-white/10 flex-1" />
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  EQUALS
                </div>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Output: Nexa Trust Score */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#141B29] to-indigo-950/40 border border-emerald-500/30 gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">Nexa Trust Score</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                      Excellent (842 / 1000)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-xl">
                    Dynamic algorithmic computation that unlocks $8,500 in instant decentralized credit without requiring predatory 150% over-collateralization.
                  </p>
                </div>
                <Link
                  href="/trust-score"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>View Score Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Comprehensive Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                Designed for the Future of Financial Freedom
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Everything required to govern, borrow, invest, and transact without sacrificing self-custody.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="p-6 rounded-2xl bg-[#0E131E] border border-white/[0.07] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center ${item.iconColor} border border-white/5`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors">
                      <span>Explore feature</span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-[#0A0D15] border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Seamless Onboarding
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                How NexaFi Works
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                From self-custodial wallet connection to undercollateralized loans in four transparent steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0F1420] border border-white/[0.06] relative group hover:border-emerald-500/30 transition-colors"
                >
                  <span className="text-3xl font-extrabold font-mono text-emerald-400/40 group-hover:text-emerald-400 transition-colors block mb-4">
                    {s.num}
                  </span>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI FINANCIAL COPILOT TEASER */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#0E131E] via-[#141B29] to-[#0E131E] border border-white/10 p-8 sm:p-12 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
                    <Bot className="w-3.5 h-3.5" />
                    Intelligent Financial Copilot
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Ask Nexa AI anything about your assets.
                  </h2>
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                    Trained on decentralized finance protocols, transaction categorizations, and credit heuristics. Get instant insights on why your Trust Score moved, how much you can borrow, and where your gas is being spent.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      'What changed in my portfolio this week?',
                      'Why did my Trust Score change?',
                      'How much credit am I eligible for?',
                    ].map((q, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300"
                      >
                        “{q}”
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/ai-assistant"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors border border-white/10"
                    >
                      <span>Try AI Assistant</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </Link>
                  </div>
                </div>

                {/* Interactive Mock Chat Bubble */}
                <div className="p-5 rounded-2xl bg-[#0A0D15] border border-white/10 space-y-3 font-sans">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold">
                      AV
                    </div>
                    <div className="p-3 rounded-xl rounded-tl-none bg-[#141B29] text-xs text-white">
                      Why did my Trust Score increase to 842 today?
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3.5 rounded-xl rounded-tl-none bg-[#121824] border border-emerald-500/20 text-xs text-slate-300 space-y-2">
                      <p>
                        Your score gained <strong>+18 points</strong> due to an on-time repayment of $500 USDC on Loan #LN-8402, plus <strong>+8 points</strong> for maintaining a verified stake in the Tech Builders Circle.
                      </p>
                      <div className="p-2 rounded bg-black/30 font-mono text-[11px] text-emerald-400">
                        Result: Available Credit increased from $8,000 → $8,500
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-20 border-t border-white/[0.06] bg-[#0A0D15] text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              The next generation of finance starts here.
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Open your non-custodial financial account today. Build your verifiable reputation and experience borderless credit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Launch NexaFi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/trust-score"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-sm border border-white/[0.08] transition-all"
              >
                Check Trust Score
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
