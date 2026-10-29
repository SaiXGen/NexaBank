'use client';

import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWeb3 } from '@/context/Web3Context';
import { useToast } from '@/context/ToastContext';
import { SendModal } from '@/components/modals/SendModal';
import { ReceiveModal } from '@/components/modals/ReceiveModal';
import { SwapModal } from '@/components/modals/SwapModal';
import { DepositModal } from '@/components/modals/DepositModal';
import { TransactionDetailModal } from '@/components/modals/TransactionDetailModal';
import { Transaction } from '@/types';

export default function WalletPage() {
  const { address, network, tokens, totalBalance, transactions, isDemo } = useWeb3();
  const { addToast } = useToast();

  const [copied, setCopied] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

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
    <AppLayout
      title="Web3 Wallet & Balances"
      subtitle="Self-custody multi-token balances and fast blockchain actions."
    >
      {/* WALLET HERO HEADER */}
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
              onClick={() => setSendOpen(true)}
              className="p-3.5 rounded-2xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 hover:border-emerald-500/40 text-left transition-all group"
            >
              <ArrowUpRight className="w-5 h-5 text-emerald-400 mb-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-xs font-bold text-white block">Send</span>
              <span className="text-[10px] text-slate-400">Transfer tokens</span>
            </button>

            <button
              onClick={() => setReceiveOpen(true)}
              className="p-3.5 rounded-2xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 hover:border-indigo-500/40 text-left transition-all group"
            >
              <ArrowDownLeft className="w-5 h-5 text-indigo-400 mb-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              <span className="text-xs font-bold text-white block">Receive</span>
              <span className="text-[10px] text-slate-400">QR & Address</span>
            </button>

            <button
              onClick={() => setSwapOpen(true)}
              className="p-3.5 rounded-2xl bg-[#141B29] hover:bg-[#1A2335] border border-white/5 hover:border-cyan-500/40 text-left transition-all group"
            >
              <RefreshCw className="w-5 h-5 text-cyan-400 mb-2 group-hover:rotate-45 transition-transform" />
              <span className="text-xs font-bold text-white block">Swap</span>
              <span className="text-[10px] text-slate-400">DEX Router</span>
            </button>

            <button
              onClick={() => setDepositOpen(true)}
              className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition-all group"
            >
              <Plus className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-emerald-300 block">Deposit</span>
              <span className="text-[10px] text-emerald-400/80">Fiat / Crypto</span>
            </button>
          </div>
        </div>
      </div>

      {/* BALANCES BREAKDOWN */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Token Balances
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] hover:border-white/20 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{token.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{token.symbol}</h4>
                    <span className="text-xs text-slate-400">{token.name}</span>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    token.change24h >= 0
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {token.change24h >= 0 ? `+${token.change24h}%` : `${token.change24h}%`}
                </span>
              </div>

              <div>
                <div className="text-xl font-bold font-mono text-white">
                  ${token.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
                  <span>
                    {token.balance.toLocaleString()} {token.symbol}
                  </span>
                  <span>${token.price.toLocaleString()} / unit</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => setSendOpen(true)}
                  className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                >
                  Send
                </button>
                <button
                  onClick={() => setSwapOpen(true)}
                  className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                >
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRANSACTION HISTORY TABLE */}
      <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white">Wallet Transaction History</h3>
            <p className="text-xs text-slate-400">All blockchain events associated with your address</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Transaction</th>
                <th className="pb-3 font-semibold">Asset</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Network</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-right">Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 font-medium text-white flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {tx.amount > 0 ? '+' : '-'}
                    </span>
                    <span>{tx.title}</span>
                  </td>
                  <td className="py-3.5 text-slate-300 font-medium">{tx.asset}</td>
                  <td className="py-3.5 font-mono font-bold">
                    <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'}>
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">{tx.network}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-[11px] border border-emerald-500/20">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">{tx.date}</td>
                  <td className="py-3.5 text-right font-mono text-emerald-400 hover:text-emerald-300">
                    {tx.txHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SendModal isOpen={sendOpen} onClose={() => setSendOpen(false)} />
      <ReceiveModal isOpen={receiveOpen} onClose={() => setReceiveOpen(false)} />
      <SwapModal isOpen={swapOpen} onClose={() => setSwapOpen(false)} />
      <DepositModal isOpen={depositOpen} onClose={() => setDepositOpen(false)} />
      <TransactionDetailModal
        transaction={selectedTx}
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </AppLayout>
  );
}
