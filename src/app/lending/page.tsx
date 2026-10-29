'use client';

import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  Plus,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useLending } from '@/hooks/useLending';
import { RequestLoanModal } from '@/components/modals/RequestLoanModal';
import { RepayLoanModal } from '@/components/modals/RepayLoanModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';

export default function LendingPage() {
  const { overview, isLoading, error, requestLoan, repayLoan, refetch } = useLending();

  const [requestOpen, setRequestOpen] = useState(false);
  const [repayOpen, setRepayOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<string | undefined>(undefined);

  const availableCredit = overview?.availableCredit ?? 12500;
  const currentBorrowed = overview?.currentBorrowed ?? 1200;
  const repaymentProgress = overview?.repaymentProgress ?? 76;
  const activeLoans = overview?.activeLoans ?? [];
  const historicalLoans = overview?.historicalLoans ?? [];

  const openRepayModalFor = (id: string) => {
    setSelectedLoanId(id);
    setRepayOpen(true);
  };

  const handleRequest = async (
    amount: number,
    durationDays: number,
    purpose: string,
    collateralAmount: number
  ): Promise<boolean> => {
    return await requestLoan({
      principalAmount: amount,
      durationDays,
      purpose,
      collateralAmount,
    });
  };

  const handleRepay = async (loanId: string, amount: number): Promise<boolean> => {
    return await repayLoan(loanId, amount);
  };

  return (
    <AppLayout
      title="Decentralized Credit Facility"
      subtitle="Undercollateralized and trust-underwritten Web3 borrowing."
    >
      {error ? (
        <ErrorState
          title="Failed to Load Credit Ledger"
          message={error}
          onRetry={refetch}
          className="mb-8"
        />
      ) : null}

      {/* TOP CREDIT METRICS HERO */}
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
              onClick={() => setRequestOpen(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Request Loan</span>
            </button>
            <button
              onClick={() => setRepayOpen(true)}
              disabled={activeLoans.length === 0}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-white font-semibold text-xs transition-colors border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Repay Loan</span>
            </button>
          </div>
        </div>

        {/* 3 Key Stats */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ) : (
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
                Across {activeLoans.length} active {activeLoans.length === 1 ? 'position' : 'positions'}
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
        )}
      </div>

      {/* ACTIVE LOAN POSITIONS */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Active Credit Facilities
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        ) : activeLoans.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0E131E] border border-white/[0.08] text-center">
            <Coins className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">No Active Borrowings</p>
            <p className="text-xs text-slate-400 mt-1">
              You are eligible for up to ${availableCredit.toLocaleString()} USDC uncollateralized credit.
            </p>
            <button
              onClick={() => setRequestOpen(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors cursor-pointer"
            >
              Request Loan Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeLoans.map((loan) => {
              const progress = loan.totalDue > 0 ? Math.round((loan.amountRepaid / loan.totalDue) * 100) : 0;
              return (
                <div
                  key={loan.id}
                  className="p-6 rounded-3xl bg-[#0E131E] border border-emerald-500/30 shadow-md flex flex-col justify-between"
                >
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
                        <span className="font-mono font-bold text-white">
                          ${loan.principalAmount.toLocaleString()} {loan.borrowedAsset}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Interest Rate</span>
                        <span className="font-mono font-bold text-indigo-400">{loan.interestRateApr}% APR</span>
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
                        <span className="text-slate-400">
                          Repaid: ${loan.amountRepaid.toLocaleString()} USDC
                        </span>
                        <span className="text-emerald-400 font-semibold">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                        <span>Due: {loan.dueDate}</span>
                        <span>Matures in {loan.durationDays} days</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => openRepayModalFor(loan.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080A0F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Repay Installment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* HISTORICAL / REPAID LOANS */}
      {historicalLoans.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
            Completed Credit History
          </h3>

          <div className="divide-y divide-white/5">
            {historicalLoans.map((l) => (
              <div key={l.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{l.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300">{l.purpose}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-[10px]">
                      Fully Settled
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Settled on {l.dueDate} • Zero Default
                  </span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-mono font-bold text-white block">
                      ${l.principalAmount.toLocaleString()} {l.borrowedAsset}
                    </span>
                    <span className="text-[10px] text-emerald-400">+12 Trust Score Earned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <RequestLoanModal
        isOpen={requestOpen}
        onClose={() => setRequestOpen(false)}
        availableCredit={availableCredit}
        onRequestLoan={handleRequest}
      />
      <RepayLoanModal
        isOpen={repayOpen}
        onClose={() => setRepayOpen(false)}
        loanId={selectedLoanId}
        loans={activeLoans}
        onRepay={handleRepay}
      />
    </AppLayout>
  );
}
