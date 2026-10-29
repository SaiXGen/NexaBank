'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShieldCheck,
  Bot,
  ArrowRight,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PortfolioChart } from '@/components/dashboard/PortfolioChart';
import { AssetAllocationChart } from '@/components/dashboard/AssetAllocationChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';
import { RequestLoanModal } from '@/components/modals/RequestLoanModal';
import { RepayLoanModal } from '@/components/modals/RepayLoanModal';
import { TransactionDetailModal } from '@/components/modals/TransactionDetailModal';
import { MetricCardSkeleton, Skeleton, TableRowSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { Transaction } from '@/types';
import confetti from 'canvas-confetti';

export default function DashboardPage() {
  const {
    user,
    wallet,
    trustScore,
    loans,
    transactions,
    portfolioChartData,
    isLoading,
    error,
    refetch,
  } = useDashboardData();

  const { addToast } = useToast();

  const [requestLoanOpen, setRequestLoanOpen] = useState(false);
  const [repayLoanOpen, setRepayLoanOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Derived state from backend API models
  const totalBalance = wallet?.totalBalanceUsd ?? 0;
  const scoreVal = trustScore?.score ?? 842;
  const scoreRating = trustScore?.ratingTier ?? 'Excellent';
  const availableCredit = loans?.availableCredit ?? (trustScore?.maxCreditLine ?? 12500);
  const currentBorrowed = loans?.currentBorrowed ?? 1200;
  const activeLoans = loans?.activeLoans ?? [];

  const handleRequestLoan = async (
    amount: number,
    durationDays: number,
    purpose: string,
    collateralAmount: number
  ): Promise<boolean> => {
    try {
      await api.loans.create({
        principalAmount: amount,
        durationDays,
        purpose,
        collateralAmount,
      });

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#6366F1', '#38BDF8'],
        });
      } catch {
        // Fallback
      }

      addToast({
        type: 'success',
        title: 'Loan Disbursed',
        message: `Successfully originated $${amount.toLocaleString()} USDC credit facility.`,
      });

      await refetch();
      return true;
    } catch (err: unknown) {
      const e = err as Error;
      addToast({
        type: 'error',
        title: 'Loan Request Failed',
        message: e.message || 'Could not process loan origination.',
      });
      return false;
    }
  };

  const handleRepayLoan = async (loanId: string, amount: number): Promise<boolean> => {
    try {
      await api.loans.repay(loanId, amount);

      addToast({
        type: 'success',
        title: 'Installment Settled',
        message: `Successfully repaid $${amount.toLocaleString()} USDC towards loan ${loanId}.`,
      });

      await refetch();
      return true;
    } catch (err: unknown) {
      const e = err as Error;
      addToast({
        type: 'error',
        title: 'Repayment Failed',
        message: e.message || 'Failed to submit loan repayment.',
      });
      return false;
    }
  };

  return (
    <AppLayout
      title="Financial Overview"
      subtitle="Decentralized financial balances, credit line, and trust metrics."
    >
      {error ? (
        <ErrorState
          title="Telemetry Data Sync Error"
          message={error}
          onRetry={refetch}
          className="mb-8"
        />
      ) : null}

      {/* TOP METRIC CARDS */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>
      ) : (
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
                {scoreRating}
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
              <span>{scoreVal}</span>
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
                onClick={() => setRequestLoanOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
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
                {activeLoans.length} Active {activeLoans.length === 1 ? 'Loan' : 'Loans'}
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              ${currentBorrowed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                {loans?.repaymentProgress ?? 76}% Repaid
              </span>
              <button
                onClick={() => setRepayLoanOpen(true)}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Repay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI INSIGHT CARD */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-[#101726] to-indigo-950/30 border border-emerald-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Nexa AI Insight</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Real-Time
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              “Nexa AI noticed that your repayment consistency improved by 8% this month, qualifying you for a 0.4% APR rate reduction on your next credit facility.”
            </p>
          </div>
        </div>
        <Link
          href="/ai-assistant"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Ask Nexa AI</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* MIDDLE GRID: Portfolio Chart & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio Chart (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          ) : (
            <PortfolioChart initialTimeframe="30D" />
          )}
        </div>

        {/* Asset Allocation Donut (1 col) */}
        <div className="p-6 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Asset Allocation</h3>
            <p className="text-xs text-slate-400 mb-4">Diversification by value share</p>
            {isLoading ? (
              <Skeleton className="h-56 w-full rounded-xl" />
            ) : (
              <AssetAllocationChart />
            )}
          </div>
          <Link
            href="/portfolio"
            className="mt-4 pt-3 border-t border-white/5 text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center justify-between"
          >
            <span>Detailed Portfolio Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* LOWER GRID: Recent Transactions & Active Loans & Trust Score Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-400">Verifiable ledger interactions</p>
            </div>
            <Link
              href="/transactions"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              View Full History →
            </Link>
          </div>

          <div className="space-y-2">
            {isLoading ? (
              <>
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </>
            ) : transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#141B29] border border-white/5 hover:border-white/15 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        tx.amount > 0
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {tx.amount > 0 ? '+' : '-'}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">{tx.title}</span>
                      <span className="text-[11px] text-slate-400">
                        {tx.category || 'DeFi'} • {tx.date}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-mono font-bold block ${
                        tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'
                      }`}
                    >
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} {tx.asset}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{tx.txHash}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                No recent transactions recorded on this account.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Loans & Trust Score Activity */}
        <div className="space-y-6">
          {/* Active Loans Card */}
          <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Credit Facilities</h4>
              <Link href="/lending" className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium">
                Manage
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-28 w-full rounded-xl" />
              </div>
            ) : activeLoans.length > 0 ? (
              activeLoans.map((loan) => {
                const progress = loan.totalDue > 0 ? Math.round((loan.amountRepaid / loan.totalDue) * 100) : 0;
                return (
                  <div key={loan.id} className="p-3.5 rounded-xl bg-[#141B29] border border-white/5 space-y-2 mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-white block">
                          ${loan.principalAmount.toLocaleString()} {loan.borrowedAsset}
                        </span>
                        <span className="text-[11px] text-slate-400">{loan.purpose}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                        {loan.interestRateApr}% APR
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Repayment</span>
                        <span className="text-emerald-400 font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-1 flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Due: {loan.dueDate}</span>
                      <button
                        onClick={() => setRepayLoanOpen(true)}
                        className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                      >
                        Repay Now
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 rounded-xl bg-[#141B29] text-center text-xs text-slate-400">
                No active loans. Click below to request credit.
              </div>
            )}

            <button
              onClick={() => setRequestLoanOpen(true)}
              className="w-full mt-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Request New Loan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trust Score Activity Feed */}
          <div className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trust Score Activity</h4>
              <Link href="/trust-score" className="text-[11px] text-emerald-400 hover:text-emerald-300">
                View All
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#141B29] border border-white/5">
                <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 mt-0.5">
                  +12
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-white leading-tight truncate">On-time installment settlement</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#141B29] border border-white/5">
                <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 mt-0.5">
                  +8
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-white leading-tight truncate">Tech Builders Circle stake collateralized</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#141B29] border border-white/5">
                <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 mt-0.5">
                  +5
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-white leading-tight truncate">Consistent DeFi liquidity provision</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RequestLoanModal
        isOpen={requestLoanOpen}
        onClose={() => setRequestLoanOpen(false)}
        availableCredit={availableCredit}
        trustScore={scoreVal}
        onRequestLoan={handleRequestLoan}
      />
      <RepayLoanModal
        isOpen={repayLoanOpen}
        onClose={() => setRepayLoanOpen(false)}
        loans={activeLoans}
        onRepay={handleRepayLoan}
      />
      <TransactionDetailModal
        transaction={selectedTx}
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </AppLayout>
  );
}
