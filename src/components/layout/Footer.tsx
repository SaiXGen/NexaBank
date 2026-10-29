import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090D] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#07090D] rounded-[7px] flex items-center justify-center font-bold text-white text-sm font-mono">
                  N
                </div>
              </div>
              <span className="font-bold text-white tracking-tight text-base">NexaFi</span>
            </Link>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Decentralized financial accounts and trust-based credit protocol. Bridging digital banking standards with self-custody and verifiable on-chain reputation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-2.5 py-1 rounded-full w-fit">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>All Systems Operational • Sepolia & L2s</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Overview</Link></li>
              <li><Link href="/wallet" className="hover:text-white transition-colors">Web3 Wallet</Link></li>
              <li><Link href="/trust-score" className="hover:text-white transition-colors">Trust Score</Link></li>
              <li><Link href="/trust-circles" className="hover:text-white transition-colors">Trust Circles</Link></li>
              <li><Link href="/lending" className="hover:text-white transition-colors">Decentralized Credit</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio Analytics</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-white transition-colors">Nexa AI Copilot</Link></li>
            </ul>
          </div>

          {/* Developers & Architecture */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">Developers</h4>
            <ul className="space-y-2">
              <li><Link href="/developers" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/developers" className="hover:text-white transition-colors">NexaFi SDK</Link></li>
              <li><Link href="/developers" className="hover:text-white transition-colors">Smart Contracts</Link></li>
              <li><Link href="/developers" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/developers" className="hover:text-white transition-colors">Webhooks</Link></li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs tracking-wider uppercase">Protocol</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About NexaFi</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security Architecture</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Features Deep Dive</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Twitter / X</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Prototype Disclaimer */}
        <div className="pt-8 border-t border-white/[0.06] text-[11px] text-slate-400 space-y-2">
          <p className="leading-relaxed">
            <strong>Important Regulatory Notice:</strong> NexaFi is a decentralized financial technology software prototype designed for demonstration and hackathon evaluation. NexaFi is not a chartered bank, depository institution, or traditional credit rating bureau. Nexa Trust Score is an experimental algorithm derived solely from public on-chain heuristics and does not constitute a FICO or consumer credit report.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span>© {new Date().getFullYear()} NexaFi Protocol. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/settings" className="hover:text-slate-300">Privacy Policy</Link>
              <Link href="/settings" className="hover:text-slate-300">Terms of Protocol</Link>
              <Link href="/security" className="hover:text-slate-300">Responsible Disclosure</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
