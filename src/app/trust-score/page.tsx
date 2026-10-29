'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Info,
  Clock,
  Users,
  Coins,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TrustScoreGauge } from '@/components/dashboard/TrustScoreGauge';
import { useTrustScore } from '@/hooks/useTrustScore';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';

export default function TrustScorePage() {
  const { trustScore, isLoading, error, refetch } = useTrustScore();

  const score = trustScore?.score ?? 842;
  const ratingTier = trustScore?.ratingTier ?? 'Excellent';
  const maxCreditLine = trustScore?.maxCreditLine ?? 12500;

  const factors = [
    {
      name: 'Payment Reliability',
      score: trustScore?.paymentReliability ?? 92,
      weight: '30%',
      description: 'Historical on-chain debt servicing, zero liquidations, and punctual loan repayments.',
      status: (trustScore?.paymentReliability ?? 92) >= 90 ? 'Optimal' : 'Good',
    },
    {
      name: 'Wallet Activity & Age',
      score: trustScore?.walletActivity ?? 84,
      weight: '20%',
      description: 'Duration of primary address active history and verified interaction diversity across EVM networks.',
      status: (trustScore?.walletActivity ?? 84) >= 80 ? 'Good' : 'Average',
    },
    {
      name: 'Financial Consistency',
      score: trustScore?.financialConsistency ?? 88,
      weight: '20%',
      description: 'Disciplined treasury management, regular net-inflow velocity, and stable asset holdings.',
      status: (trustScore?.financialConsistency ?? 88) >= 85 ? 'Optimal' : 'Good',
    },
    {
      name: 'Circle Reputation',
      score: trustScore?.circleReputation ?? 79,
      weight: '15%',
      description: 'Vouching strength, mutual staked guarantees, and collaborative endorsement in Trust Circles.',
      status: (trustScore?.circleReputation ?? 79) >= 75 ? 'Good' : 'Needs Improvement',
    },
    {
      name: 'Asset Stability',
      score: trustScore?.assetStability ?? 86,
      weight: '15%',
      description: 'Resilience against volatility, diversification in audited stablecoins (USDC), and bluechip tokens.',
      status: (trustScore?.assetStability ?? 86) >= 80 ? 'Optimal' : 'Good',
    },
  ];

  const timelineItems = [
    {
      id: 't-1',
      change: '+14',
      reason: 'Settled 90-day credit facility ahead of maturity date',
      category: 'repayment',
      timestamp: 'Yesterday',
      positive: true,
    },
    {
      id: 't-2',
      change: '+8',
      reason: 'Underwrote peer borrower in Tech Builders Circle with 1,000 USDC stake',
      category: 'circle',
      timestamp: '3 days ago',
      positive: true,
    },
    {
      id: 't-3',
      change: '+5',
      reason: 'Maintained 0% liquidation threshold through 24-month DeFi volatility',
      category: 'transaction',
      timestamp: '1 week ago',
      positive: true,
    },
    {
      id: 't-4',
      change: '+16',
      reason: 'Linked verifiable GitHub Web3 developer identity with continuous smart contract commits',
      category: 'circle',
      timestamp: '2 weeks ago',
      positive: true,
    },
  ];

  return (
    <AppLayout
      title="Nexa Trust Score Hub"
      subtitle="Decentralized identity, on-chain underwriting factors, and credit eligibility."
    >
      {/* PROTOTYPE DISCLAIMER BANNER */}
      <div className="mb-6 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/25 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Decentralized Protocol Metric:</strong> Nexa Trust Score is an experimental on-chain reputational index generated from verifiable blockchain history, smart contract interactions, and peer trust circles. It is evaluated via deterministic protocol parameters for uncollateralized lending limits.
        </div>
      </div>

      {error ? (
        <ErrorState
          title="Failed to Load Trust Score Telemetry"
          message={error}
          onRetry={refetch}
          className="mb-8"
        />
      ) : null}

      {/* MAIN HERO SCORE CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E131E] via-[#141B29] to-[#0E131E] border border-white/[0.08] shadow-lg mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Gauge Column */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#0A0E17]/60 rounded-2xl border border-white/5">
            {isLoading ? (
              <div className="w-48 h-48 rounded-full border-8 border-white/5 border-t-emerald-500 animate-spin flex items-center justify-center" />
            ) : (
              <>
                <TrustScoreGauge score={score} maxScore={1000} rating={ratingTier} size="lg" />
                <p className="mt-3 text-xs text-slate-400 text-center">
                  Top 8% of all analyzed on-chain participants
                </p>
              </>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-72" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-10 w-64" />
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Tier: {ratingTier}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-300 font-mono">
                    Max Uncollateralized Limit: ${maxCreditLine.toLocaleString()} USDC
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Verifiable On-Chain Reputation
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your profile reflects continuous discipline in digital asset stewardship, 0% liquidation events across multi-chain borrowing pools, and active mutual guarantees in your peer Trust Circles.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/lending"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Borrow Based on Trust</span>
                  </Link>
                  <Link
                    href="/trust-circles"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors border border-white/10 flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>View Trust Circles</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5-FACTOR SCORE BREAKDOWN */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Algorithmic Factors Breakdown
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {factors.map((factor) => (
              <div
                key={factor.name}
                className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] hover:border-white/15 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-white">{factor.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-semibold">
                      Weight: {factor.weight}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold font-mono text-emerald-400">{factor.score}%</span>
                    <span className="text-[11px] text-slate-400">Target: &gt;80%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-3">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{factor.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-400 font-semibold uppercase">{factor.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SCORE TIMELINE & ADJUSTMENTS */}
      <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white">Trust Score Activity Timeline</h3>
            <p className="text-xs text-slate-400">Verifiable on-chain events that adjusted your score</p>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-semibold">+43 Net Lifetime Gain</span>
        </div>

        <div className="space-y-3">
          {timelineItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#141B29] border border-white/5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-xs ${
                    item.positive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {item.change}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">{item.reason}</h4>
                  <span className="text-[11px] text-slate-400 capitalize">{item.category} Event</span>
                </div>
              </div>

              <span className="text-xs text-slate-400 font-mono shrink-0">{item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
