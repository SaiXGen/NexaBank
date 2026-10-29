'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wallet, ShieldCheck, Coins, Bot } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
    { label: 'Trust', href: '/trust-score', icon: ShieldCheck },
    { label: 'Loans', href: '/lending', icon: Coins },
    { label: 'AI', href: '/ai-assistant', icon: Bot },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080A0F]/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-emerald-400 font-semibold scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
