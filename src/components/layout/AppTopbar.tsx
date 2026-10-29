'use client';

import React, { useState } from 'react';
import { Search, Bell, Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Plus, Check } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { SendModal } from '@/components/modals/SendModal';
import { ReceiveModal } from '@/components/modals/ReceiveModal';
import { SwapModal } from '@/components/modals/SwapModal';
import { DepositModal } from '@/components/modals/DepositModal';
import { ConnectWalletModal } from '@/components/modals/ConnectWalletModal';

interface AppTopbarProps {
  title?: string;
  subtitle?: string;
}

export function AppTopbar({ title, subtitle }: AppTopbarProps) {
  const { isConnected, address, ensName, totalBalance, network } = useWeb3();

  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Loan Repayment Received', desc: '500 USDC processed on Ethereum', time: '2h ago' },
    { id: 2, title: 'Trust Score Increased (+18)', desc: 'Payment reliability updated to 92%', time: '2h ago' },
    { id: 3, title: 'Tech Builders Circle', desc: 'Marcus Chen joined with 7,500 USDC stake', time: '1d ago' },
  ];

  return (
    <>
      <header className="h-16 border-b border-white/[0.08] bg-[#080A0F]/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
        {/* Left Title / Breadcrumb */}
        <div>
          {title && <h1 className="text-base font-bold text-white leading-tight">{title}</h1>}
          {subtitle && <p className="text-xs text-slate-400 hidden sm:block">{subtitle}</p>}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Buttons */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#121824] border border-white/5">
            <button
              onClick={() => setSendOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>Send</span>
            </button>
            <button
              onClick={() => setReceiveOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors"
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Receive</span>
            </button>
            <button
              onClick={() => setSwapOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Swap</span>
            </button>
            <button
              onClick={() => setDepositOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center gap-1 transition-colors border border-emerald-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Deposit</span>
            </button>
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl bg-[#121824] border border-white/5 text-slate-300 hover:text-white relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0E131E] border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                  <span className="text-[10px] text-emerald-400 font-medium">3 New</span>
                </div>
                <div className="mt-2 space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-[#141B29] border border-white/5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wallet address chip */}
          <button
            onClick={() => setConnectOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121824] border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-white transition-all shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono">{ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          </button>
        </div>
      </header>

      {/* Reusable Modals connected to topbar */}
      <SendModal isOpen={sendOpen} onClose={() => setSendOpen(false)} />
      <ReceiveModal isOpen={receiveOpen} onClose={() => setReceiveOpen(false)} />
      <SwapModal isOpen={swapOpen} onClose={() => setSwapOpen(false)} />
      <DepositModal isOpen={depositOpen} onClose={() => setDepositOpen(false)} />
      <ConnectWalletModal isOpen={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
