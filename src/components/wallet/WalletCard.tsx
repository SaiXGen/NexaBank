'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, ArrowDownLeft, RefreshCw, Plus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface WalletCardProps {
  address: string;
  network: string;
  totalBalance: number;
  isDemo?: boolean;
  onSend: () => void;
  onReceive: () => void;
  onSwap: () => void;
  onDeposit: () => void;
}

export function WalletCard({
  address,
  network,
  totalBalance,
  isDemo = true,
  onSend,
  onReceive,
  onSwap,
  onDeposit,
}: WalletCardProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Address Copied',
      message: 'Wallet address copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E131E] via-[#141B29] to-[#0E131E] border border-white/[0.08] shadow-lg mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-400">Connected Account</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
              {network} • {isDemo ? 'Demo Mode' : 'Live EVM'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-mono font-bold text-white break-all">
              {address}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Copy Address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-4">
            <span className="text-xs text-slate-400 block">Total Account Valuation</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-0.5">
              ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={onSend}
            className="p-3.5 rounded-2xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 hover:border-emerald-500/40 text-left transition-all group"
          >
            <ArrowUpRight className="w-5 h-5 text-emerald-400 mb-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-xs font-bold text-white block">Send</span>
            <span className="text-[10px] text-slate-400">Transfer tokens</span>
          </button>

          <button
            onClick={onReceive}
            className="p-3.5 rounded-2xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 hover:border-indigo-500/40 text-left transition-all group"
          >
            <ArrowDownLeft className="w-5 h-5 text-indigo-400 mb-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            <span className="text-xs font-bold text-white block">Receive</span>
            <span className="text-[10px] text-slate-400">QR & Address</span>
          </button>

          <button
            onClick={onSwap}
            className="p-3.5 rounded-2xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 hover:border-cyan-500/40 text-left transition-all group"
          >
            <RefreshCw className="w-5 h-5 text-cyan-400 mb-2 group-hover:rotate-45 transition-transform" />
            <span className="text-xs font-bold text-white block">Swap</span>
            <span className="text-[10px] text-slate-400">DEX Router</span>
          </button>

          <button
            onClick={onDeposit}
            className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition-all group"
          >
            <Plus className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-emerald-300 block">Deposit</span>
            <span className="text-[10px] text-emerald-400/80">Fiat / Crypto</span>
          </button>
        </div>
      </div>
    </div>
  );
}
