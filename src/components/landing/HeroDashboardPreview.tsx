'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Wallet,
  Coins,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { TrustScoreGauge } from '@/components/dashboard/TrustScoreGauge';
import { SendModal } from '@/components/modals/SendModal';
import { ReceiveModal } from '@/components/modals/ReceiveModal';
import { SwapModal } from '@/components/modals/SwapModal';

export function HeroDashboardPreview() {
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);

  return (
    <>
      <div className="relative mx-auto max-w-5xl w-full">
        {/* Ambient background glow behind preview */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 -z-10" />

        {/* Outer Glass Container */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0A0E17]/90 backdrop-blur-2xl shadow-2xl p-4 sm:p-7 overflow-hidden">
          {/* Top Bar of Preview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#0E131F] rounded-[9px] flex items-center justify-center font-bold text-white text-sm font-mono">
                  AV
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">alex.nexafi.eth</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Tier: Prime
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">0x71C83e58...bF93F2</p>
              </div>
            </div>

            {/* Quick Action Triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSendOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
              <button
                onClick={() => setReceiveOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold border border-indigo-500/20 flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Receive</span>
              </button>
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <span>Full App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Core 3 Metric Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 py-6">
            {/* 1. Total Balance */}
            <div className="p-5 rounded-2xl bg-[#121824]/80 border border-white/5 shadow-md relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-slate-400">Total Balance</span>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  +2.84% (24h)
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                $24,850.40
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Unified across Ethereum, Arbitrum & Base
              </p>
            </div>

            {/* 2. Trust Score Gauge */}
            <div className="p-5 rounded-2xl bg-[#121824]/80 border border-emerald-500/20 shadow-md relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Trust Score</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">842</div>
                <div className="text-xs text-emerald-400 font-semibold mt-0.5">Tier: Excellent</div>
                <p className="text-[11px] text-slate-400 mt-1.5">+18 pts this week</p>
              </div>
              <div className="shrink-0 -mr-2">
                <TrustScoreGauge score={842} maxScore={1000} rating="Excellent" size="sm" />
              </div>
            </div>

            {/* 3. Available Credit */}
            <div className="p-5 rounded-2xl bg-[#121824]/80 border border-white/5 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-slate-400">Available Credit</span>
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  4.8% APR
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                $8,500.00
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Pre-approved credit • Zero liquidations required
              </p>
            </div>
          </div>

          {/* Lower Grid: Portfolio Tokens & Recent Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Portfolio Mini List */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Portfolio Holdings
                </span>
                <Link href="/portfolio" className="text-[11px] text-emerald-400 hover:text-emerald-300">
                  View Analytics →
                </Link>
              </div>
              <div className="space-y-2.5">
                {[
                  { symbol: 'USDC', name: 'USD Coin', balance: '$12,400.00', share: '49.9%', icon: '💵' },
                  { symbol: 'BTC', name: 'Bitcoin (WBTC)', balance: '$8,170.00', share: '32.9%', icon: '₿' },
                  { symbol: 'ETH', name: 'Ethereum', balance: '$4,280.40', share: '17.2%', icon: '⟠' },
                ].map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#141B29] border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{token.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-white block">{token.symbol}</span>
                        <span className="text-[11px] text-slate-400">{token.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white block">{token.balance}</span>
                      <span className="text-[11px] text-slate-400">{token.share}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions List */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Transactions
                </span>
                <Link href="/transactions" className="text-[11px] text-emerald-400 hover:text-emerald-300">
                  Full Ledger →
                </Link>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    title: 'Loan Repayment',
                    amount: '+ $500.00',
                    isPositive: true,
                    meta: 'Tech Builders Pool • Ethereum',
                    hash: '0x8f2a...492b',
                  },
                  {
                    title: 'USDC Transfer',
                    amount: '- $250.00',
                    isPositive: false,
                    meta: 'Sent to elena.eth • Base',
                    hash: '0x3e1d...99ac',
                  },
                  {
                    title: 'Yield Deposit',
                    amount: '+ $84.00',
                    isPositive: true,
                    meta: 'Nexa Yield Strategy Vault',
                    hash: '0x99a1...10fe',
                  },
                ].map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#141B29] border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                          tx.isPositive
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {tx.isPositive ? '+' : '-'}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">{tx.title}</span>
                        <span className="text-[11px] text-slate-400">{tx.meta}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-mono font-bold block ${
                          tx.isPositive ? 'text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        {tx.amount}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{tx.hash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SendModal isOpen={sendOpen} onClose={() => setSendOpen(false)} />
      <ReceiveModal isOpen={receiveOpen} onClose={() => setReceiveOpen(false)} />
      <SwapModal isOpen={swapOpen} onClose={() => setSwapOpen(false)} />
    </>
  );
}
