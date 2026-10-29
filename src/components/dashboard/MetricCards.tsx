'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, Coins, CreditCard } from 'lucide-react';

interface MetricCardsProps {
  totalBalance: number;
  trustScore: number;
  trustRating: string;
  availableCredit: number;
  currentBorrowed: number;
  activeLoansCount: number;
  onBorrow: () => void;
  onRepay: () => void;
}

export function MetricCards({
  totalBalance,
  trustScore,
  trustRating,
  availableCredit,
  currentBorrowed,
  activeLoansCount,
  onBorrow,
  onRepay,
}: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Balance */}
      <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-slate-400">Total Balance</span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +2.84%
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-white">
          ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-[11px] text-slate-400 mt-2">Combined across 3 chains</p>
      </div>

      {/* Trust Score */}
      <Link
        href="/trust-score"
        className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] hover:border-emerald-500/40 transition-all shadow-sm block group"
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Nexa Trust Score
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            {trustRating}
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
          <span>{trustScore}</span>
          <span className="text-xs font-normal text-slate-400">/ 1000</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
          <span>+18 points this week</span>
          <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
        </p>
      </Link>

      {/* Available Credit */}
      <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-slate-400">Available Credit</span>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-bold">
            4.8% APR
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-white">
          ${availableCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Zero liquidation penalty</span>
          <button
            onClick={onBorrow}
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Borrow
          </button>
        </div>
      </div>

      {/* Active Debt / Loans */}
      <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-slate-400">Active Debt</span>
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
            {activeLoansCount} Active Loan
          </span>
        </div>
        <div className="text-2xl font-bold font-mono text-white">
          ${currentBorrowed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">76% Repaid</span>
          <button
            onClick={onRepay}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Repay
          </button>
        </div>
      </div>
    </div>
  );
}
