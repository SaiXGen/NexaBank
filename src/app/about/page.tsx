'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Coins,
  ArrowRight,
  Globe,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Our Mission & Philosophy
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Reinventing Trust for the Decentralized Era.
            </h1>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Traditional banking locks billions of digital-native builders and innovators out of credit due to antiquated geographic credit bureaus. NexaFi transforms verifiable on-chain behavior into objective, sovereign financial trust.
            </p>
          </div>

          {/* Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="p-8 rounded-3xl bg-[#0E131E] border border-white/[0.08]">
              <h3 className="text-lg font-bold text-white mb-3">The Problem: Predatory Collateral</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Existing DeFi lending requires 150% to 200% over-collateralization. If you have $10,000, you can only borrow $5,000. This rewards capital hoarding rather than productivity, excluding talented builders from working capital.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0E131E] border border-emerald-500/30">
              <h3 className="text-lg font-bold text-white mb-3">The Solution: Trust-Based Credit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                NexaFi introduces multi-factor on-chain reputation and peer-backed Trust Circles. By assessing payment reliability, wallet longevity, and social guarantees, builders can unlock uncollateralized credit lines at fair rates.
              </p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="p-8 rounded-3xl bg-[#0A0D15] border border-white/10 mb-16 space-y-6">
            <h3 className="text-xl font-bold text-white">Three Foundational Commitments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
              <div>
                <strong className="text-white block text-sm mb-1">1. Absolute Self-Custody</strong>
                No deposits in opaque bank vaults. All liquidity pools and loan agreements operate transparently on public EVM networks.
              </div>
              <div>
                <strong className="text-white block text-sm mb-1">2. Transparent Reputation</strong>
                The Nexa Trust Score algorithm is open and auditable. There are no secret penalties, hidden bureau files, or discriminatory factors.
              </div>
              <div>
                <strong className="text-white block text-sm mb-1">3. Peer Accountability</strong>
                Trust Circles enable communities of developers, founders, and researchers to pool risk and vouch for each other.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#121824] to-indigo-950/40 border border-emerald-500/30 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Experience NexaFi Today</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Launch the live app in Demo Mode or connect your EVM wallet to evaluate your on-chain trust score.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors"
              >
                Launch Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
