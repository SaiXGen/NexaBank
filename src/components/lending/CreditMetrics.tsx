'use client';

import React from 'react';
import { ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

interface CreditMetricsProps {
  availableCredit: number;
  currentBorrowed: number;
  repaymentProgress: number;
  activeLoansCount: number;
  onRequestLoan: () => void;
  onRepayLoan: () => void;
}

export function CreditMetrics({
  availableCredit,
  currentBorrowed,
  repaymentProgress,
  activeLoansCount,
  onRequestLoan,
  onRepayLoan,
}: CreditMetricsProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E131E] via-[#141B29] to-[#0E131E] border border-white/[0.08] shadow-lg mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trust Score Governed • Tier: Excellent
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Decentralized Credit
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Access liquidity directly from community vaults. Repaying on time strengthens your reputation, lowering your base APR.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onRequestLoan}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Request Loan</span>
          </button>
          <button
            onClick={onRepayLoan}
            disabled={activeLoansCount === 0}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-white font-semibold text-xs transition-colors border border-white/10 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Repay Loan</span>
          </button>
        </div>
      </div>

      {/* 3 Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6">
        <div className="p-4 rounded-2xl bg-[#141B29] border border-white/5">
          <span className="text-xs font-medium text-slate-400 block mb-1">Available Credit</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
            ${availableCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Pre-approved uncollateralized limit
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141B29] border border-white/5">
          <span className="text-xs font-medium text-slate-400 block mb-1">Current Borrowed</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            ${currentBorrowed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Across {activeLoansCount} active position
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141B29] border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-slate-400">Repayment Progress</span>
            <span className="text-xs font-bold font-mono text-emerald-400">{repaymentProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden my-2">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${repaymentProgress}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 block">
            Zero delinquent payments on record
          </span>
        </div>
      </div>
    </div>
  );
}
