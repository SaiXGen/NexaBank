'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface RequestLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCredit?: number;
  trustScore?: number;
  onRequestLoan?: (amount: number, durationDays: number, purpose: string, collateralAmount: number) => Promise<boolean>;
}

export function RequestLoanModal({
  isOpen,
  onClose,
  availableCredit: propCredit,
  trustScore: propScore,
  onRequestLoan,
}: RequestLoanModalProps) {
  const web3 = useWeb3();
  const availableCredit = propCredit !== undefined ? propCredit : web3.availableCredit;
  const trustScore = propScore !== undefined ? propScore : web3.trustScore;
  const submitLoan = onRequestLoan || web3.requestLoan;

  const [amount, setAmount] = useState('2500');
  const [duration, setDuration] = useState('90');
  const [purpose, setPurpose] = useState('Infrastructure scaling & compute');
  const [collateralOption, setCollateralOption] = useState<'zero' | 'low'>('zero');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const parsedAmount = parseFloat(amount) || 0;
  const parsedDuration = parseInt(duration) || 90;
  const isEligible = parsedAmount <= availableCredit && parsedAmount > 0;
  const apr = 4.8;
  const estimatedInterest = Number((parsedAmount * (apr / 100) * (parsedDuration / 365)).toFixed(2));
  const totalRepayment = (parsedAmount + estimatedInterest).toFixed(2);
  const collateralRequired = collateralOption === 'low' ? Number((parsedAmount * 0.15).toFixed(2)) : 0;

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) return;

    setIsSubmitting(true);
    const success = await submitLoan(parsedAmount, parsedDuration, purpose, collateralRequired);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0E131E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Request Decentralized Credit</h3>
            <p className="text-xs text-slate-400">Underwritten by your Nexa Trust Score ({trustScore} / 1000)</p>
          </div>
        </div>

        {/* Eligibility Indicator */}
        <div
          className={`p-3.5 rounded-xl border mb-5 flex items-center justify-between ${
            isEligible
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {isEligible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <div>
              <span className="text-xs font-semibold block">
                {isEligible ? 'Instant Pre-Approval Verified' : 'Amount Exceeds Available Limit'}
              </span>
              <span className="text-[11px] text-slate-400">
                Max Uncollateralized Limit: ${availableCredit.toLocaleString()} USDC
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/30">
            Tier: Excellent
          </span>
        </div>

        <form onSubmit={handleRequest} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Loan Amount (USDC)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="100"
                max={availableCredit}
                step="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-8 pr-16 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-base font-semibold focus:outline-none focus:border-emerald-500/60"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">USDC</span>
            </div>
            <div className="flex gap-2 mt-2">
              {['1000', '2500', '5000', availableCredit.toString()].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val)}
                  className="py-1 px-2.5 rounded-lg border border-white/5 bg-[#141B29] hover:bg-[#1A2335] text-xs font-semibold text-slate-300 transition-colors"
                >
                  {val === availableCredit.toString() ? 'Max' : `$${Number(val).toLocaleString()}`}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Loan Term</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/60"
              >
                <option value="30">30 Days (1 Month)</option>
                <option value="60">60 Days (2 Months)</option>
                <option value="90">90 Days (3 Months)</option>
                <option value="180">180 Days (6 Months)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Collateral Mode</label>
              <select
                value={collateralOption}
                onChange={(e) => setCollateralOption(e.target.value as 'zero' | 'low')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/60"
              >
                <option value="zero">Zero Collateral (Trust Underwritten)</option>
                <option value="low">15% Micro-Collateral (Save 0.5% APR)</option>
              </select>
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Purpose / Memo</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Working capital, smart contract audit, liquidity provision"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          {/* Terms summary */}
          <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/5 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Annual Percentage Rate (APR)</span>
              <span className="text-white font-medium">{apr}% Fixed</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimated Total Interest</span>
              <span className="text-emerald-400 font-medium">${estimatedInterest.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Repayment Due</span>
              <span className="text-white font-bold">${totalRepayment} USDC</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Locked Collateral</span>
              <span className="text-slate-300 font-medium">
                {collateralOption === 'zero' ? '$0.00 (Zero Collateral)' : `$${collateralRequired} USDC`}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isEligible}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Originating Loan on Blockchain...
              </span>
            ) : (
              <span>Disburse ${parsedAmount.toLocaleString()} USDC Loan</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
