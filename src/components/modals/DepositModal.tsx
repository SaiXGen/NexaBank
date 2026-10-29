'use client';

import React, { useState } from 'react';
import { X, ArrowDownRight, CreditCard, Wallet, Check } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { depositFunds } = useWeb3();
  const [tab, setTab] = useState<'fiat' | 'crypto'>('fiat');
  const [amount, setAmount] = useState('1000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val <= 0) return;

    setIsSubmitting(true);
    const success = await depositFunds(val, 'USDC', tab);
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
            <ArrowDownRight className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Deposit Capital</h3>
            <p className="text-xs text-slate-400">Add funds to your decentralized account</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-[#141B29] border border-white/5 mb-5">
          <button
            type="button"
            onClick={() => setTab('fiat')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === 'fiat'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Fiat On-Ramp (Card/Bank)
          </button>
          <button
            type="button"
            onClick={() => setTab('crypto')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === 'crypto'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            Crypto Transfer
          </button>
        </div>

        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Deposit Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="10"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full pl-8 pr-16 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-base font-semibold focus:outline-none focus:border-emerald-500/60"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">USDC</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {['250', '500', '1000', '2500'].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className="py-1 rounded-lg border border-white/5 bg-[#141B29] hover:bg-[#1A2335] text-xs font-semibold text-slate-300 transition-colors"
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {tab === 'fiat' ? (
            <div className="p-3 rounded-xl bg-[#141B29] border border-white/5 space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">Payment Method</span>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E131E] border border-white/5">
                  <span className="flex items-center gap-2 text-white">
                    <span>💳</span> Debit Card (Instant)
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">0% Fee Demo</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E131E] border border-white/5">
                  <span className="flex items-center gap-2 text-white">
                    <span>🏦</span> ACH / Wire Transfer
                  </span>
                  <span className="text-[11px] text-slate-400">1-2 days</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#141B29] border border-white/5 text-xs text-slate-300">
              <p>Simulates incoming transfer from an external address to your NexaFi vault.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Deposit...
              </span>
            ) : (
              <span>Confirm ${amount || '0'} Deposit</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
