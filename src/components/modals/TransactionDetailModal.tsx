'use client';

import React from 'react';
import { X, ExternalLink, CheckCircle2, Clock, AlertCircle, Copy } from 'lucide-react';
import { Transaction } from '@/types';
import { useToast } from '@/context/ToastContext';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailModal({ transaction, isOpen, onClose }: TransactionDetailModalProps) {
  const { addToast } = useToast();

  if (!isOpen || !transaction) return null;

  const copyHash = () => {
    navigator.clipboard.writeText(transaction.txHash);
    addToast({
      type: 'info',
      title: 'Hash Copied',
      message: 'Transaction hash copied to clipboard.',
    });
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
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
            {transaction.status === 'Completed' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : transaction.status === 'Pending' ? (
              <Clock className="w-5 h-5 text-amber-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{transaction.title}</h3>
            <p className="text-xs text-slate-400">{transaction.category} • {transaction.date}</p>
          </div>
        </div>

        {/* Amount Hero */}
        <div className="p-4 rounded-xl bg-[#141B29] border border-white/5 text-center mb-5">
          <span className="text-xs text-slate-400 block mb-1">Transaction Value</span>
          <div className="text-2xl font-bold font-mono text-white">
            {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount} {transaction.asset}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            ≈ ${transaction.valueUsd.toLocaleString()} USD
          </span>
        </div>

        {/* Details list */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-[#141B29]/60 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Status</span>
            <span
              className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${
                transaction.status === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : transaction.status === 'Pending'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {transaction.status}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#141B29]/60 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Network</span>
            <span className="text-white font-medium">{transaction.network}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141B29]/60 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Gas Paid</span>
            <span className="text-white font-mono">${transaction.gasFee.toFixed(2)} USD</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141B29]/60 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Transaction Hash</span>
            <div className="flex items-center gap-1.5 font-mono text-emerald-400">
              <span>{transaction.txHash}</span>
              <button onClick={copyHash} className="p-1 hover:text-white transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141B29]/60 border border-white/5 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">From</span>
              <span className="text-slate-300 font-mono truncate max-w-[200px]">{transaction.from}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">To</span>
              <span className="text-slate-300 font-mono truncate max-w-[200px]">{transaction.to}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
