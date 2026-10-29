'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Loan } from '@/types';

interface LoanCardProps {
  loan: Loan;
  onRepay: (id: string) => void;
}

export function LoanCard({ loan, onRepay }: LoanCardProps) {
  return (
    <div className="p-6 rounded-3xl bg-[#0E131E] border border-emerald-500/30 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-slate-400">{loan.id}</span>
            <h4 className="text-lg font-bold text-white">{loan.purpose}</h4>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/5 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Principal</span>
            <span className="font-mono font-bold text-white">${loan.amount.toLocaleString()} USDC</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Interest Rate</span>
            <span className="font-mono font-bold text-indigo-400">{loan.interestRate}% APR</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Term</span>
            <span className="font-medium text-slate-200">{loan.durationDays} Days</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Collateral</span>
            <span className="font-medium text-slate-200">
              {loan.collateralAmount > 0 ? `$${loan.collateralAmount} USDC` : 'Zero (Trust)'}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Repaid: ${loan.amountRepaid.toLocaleString()} USDC</span>
            <span className="text-emerald-400 font-semibold">{loan.repaymentProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${loan.repaymentProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 pt-1">
            <span>Borrowed: {loan.borrowedDate}</span>
            <span>Matures: {loan.dueDate}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
        <button
          onClick={() => onRepay(loan.id)}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>Repay Installment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
