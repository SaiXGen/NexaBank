'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Wallet, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { ConnectWalletModal } from '@/components/modals/ConnectWalletModal';

export function Navbar() {
  const pathname = usePathname();
  const { isConnected, address, ensName } = useWeb3();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', href: '/dashboard' },
    { label: 'Features', href: '/features' },
    { label: 'Trust Score', href: '/trust-score' },
    { label: 'Developers', href: '/developers' },
    { label: 'Security', href: '/security' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#080A0F]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-[1.5px] shadow-lg shadow-emerald-500/10 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#080A0F] rounded-[10px] flex items-center justify-center">
                <span className="font-bold text-white tracking-wider text-base font-mono">N</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-lg">NexaFi</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                Trust. Finance. Web3.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-white/5 border border-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>

            <button
              onClick={() => setIsConnectOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:border-emerald-500/50 shadow-sm"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>
                {isConnected
                  ? ensName || `${address.slice(0, 6)}...${address.slice(-4)}`
                  : 'Connect Wallet'}
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsConnectOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
            >
              <Wallet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 pt-2 pb-5 border-b border-white/10 bg-[#0E131E] space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-white/10 text-xs font-semibold text-white"
              >
                Launch App
              </Link>
            </div>
          </div>
        )}
      </nav>

      <ConnectWalletModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
    </>
  );
}
