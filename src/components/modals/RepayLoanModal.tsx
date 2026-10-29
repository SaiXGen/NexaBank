'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface RepayLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanId?: string;
  loans?: any[];
  onRepay?: (loanId: string, amount: number) => Promise<boolean>;
}

export function RepayLoanModal({ isOpen, onClose, loanId, loans: propLoans, onRepay }: RepayLoanModalProps) {
  const web3 = useWeb3();
  const allLoans = propLoans || web3.loans;
  const activeLoans = allLoans.filter((l: any) => l.status === 'active' || l.status === 'ACTIVE');
  const [selectedLoanId, setSelectedLoanId] = useState(loanId || (activeLoans[0]?.id ?? ''));
  const [amount, setAmount] = useState('500');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentLoan = allLoans.find((l: any) => l.id === selectedLoanId) || activeLoans[0];
  const remainingDebt = currentLoan ? (currentLoan.totalDue || 0) - (currentLoan.amountRepaid || 0) : 0;
  const usdcToken = web3.tokens?.find((t) => t.symbol === 'USDC');
  const submitRepay = onRepay || web3.repayLoan;

  const handleRepay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLoan || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    const success = await submitRepay(currentLoan.id, parseFloat(amount));
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0E131E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Repay Credit Facility</h3>
            <p className="text-xs text-slate-400">Boosts your Nexa Trust Score upon settlement</p>
          </div>
        </div>

        {activeLoans.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-[#141B29] border border-white/5">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">No Active Debt</p>
            <p className="text-xs text-slate-400 mt-1">
              You currently have zero outstanding loans. Your repayment record is pristine!
            </p>
          </div>
        ) : (
          <form onSubmit={handleRepay} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Loan</label>
              <select
                value={selectedLoanId}
                onChange={(e) => setSelectedLoanId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/60"
              >
                {activeLoans.map((l: any) => (
                  <option key={l.id} value={l.id}>
                    {l.id} • ${(l.amount ?? l.principalAmount ?? 0).toLocaleString()} USDC ({l.purpose})
                  </option>
                ))}
              </select>
            </div>

            {currentLoan && (() => {
              const progress = currentLoan.repaymentProgress ?? (currentLoan.totalDue > 0 ? Math.round(((currentLoan.amountRepaid || 0) / currentLoan.totalDue) * 100) : 0);
              return (
                <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Loan Value</span>
                    <span className="text-white font-medium">${(currentLoan.totalDue || 0).toLocaleString()} USDC</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Already Repaid</span>
                    <span className="text-emerald-400 font-medium">
                      ${(currentLoan.amountRepaid || 0).toLocaleString()} USDC ({progress}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Remaining Balance</span>
                    <span className="text-white font-bold">${remainingDebt.toFixed(2)} USDC</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-1">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })()}

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-300">Repayment Amount (USDC)</label>
                <button
                  type="button"
                  onClick={() => setAmount(remainingDebt.toFixed(2))}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300"
                >
                  Pay Full (${remainingDebt.toFixed(2)})
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="1"
                  max={remainingDebt}
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full pl-8 pr-16 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-base font-semibold focus:outline-none focus:border-emerald-500/60"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">USDC</span>
              </div>
              <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                <span>Available: {usdcToken?.balance.toLocaleString()} USDC</span>
                <span className="text-emerald-400">+6 Trust Score reward</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Repayment On-Chain...
                </span>
              ) : (
                <span>Confirm Repayment of ${amount} USDC</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
