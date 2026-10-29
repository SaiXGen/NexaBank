'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  ArrowLeftRight,
  ShieldCheck,
  Users,
  Coins,
  Bot,
  Settings,
  ChevronDown,
  LogOut,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { NetworkType } from '@/types';

interface AppSidebarProps {
  collapsed?: boolean;
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const pathname = usePathname();
  const { address, ensName, network, switchNetwork, isDemo, disconnectWallet } = useWeb3();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
    { label: 'Portfolio', href: '/portfolio', icon: PieChart },
    { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
    { label: 'Trust Score', href: '/trust-score', icon: ShieldCheck, badge: '842' },
    { label: 'Trust Circles', href: '/trust-circles', icon: Users },
    { label: 'Lending', href: '/lending', icon: Coins, badge: 'Credit' },
    { label: 'AI Assistant', href: '/ai-assistant', icon: Bot, badge: 'Copilot' },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const networks: NetworkType[] = ['Ethereum', 'Arbitrum', 'Base', 'Polygon'];

  return (
    <aside className="w-64 border-r border-white/[0.08] bg-[#0A0D15] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Top Header */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-600 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-[#0A0D15] rounded-[7px] flex items-center justify-center font-bold text-white text-sm font-mono">
                N
              </div>
            </div>
            <span className="font-bold text-white tracking-tight text-base">NexaFi</span>
            {isDemo && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                Demo
              </span>
            )}
          </Link>
        </div>

        {/* Network Switcher Pill */}
        <div className="px-4 pt-4 pb-2">
          <div className="p-2 rounded-xl bg-[#121824] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <select
                value={network}
                onChange={(e) => switchNetwork(e.target.value as NetworkType)}
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
              >
                {networks.map((net) => (
                  <option key={net} value={net} className="bg-[#121824] text-white">
                    {net}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[10px] font-mono text-slate-500">L1/L2</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/25 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Account Pill */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="p-3 rounded-xl bg-[#121824] border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                AV
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{ensName}</p>
                <p className="text-[10px] font-mono text-slate-400 truncate">{address}</p>
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              title="Disconnect"
              className="text-slate-400 hover:text-rose-400 transition-colors p-1"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
