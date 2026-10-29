'use client';

import React from 'react';
import {
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Coins,
  ArrowDownLeft,
  RefreshCw,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PortfolioChart } from '@/components/dashboard/PortfolioChart';
import { AssetAllocationChart } from '@/components/dashboard/AssetAllocationChart';
import { useWeb3 } from '@/context/Web3Context';

export default function PortfolioPage() {
  const { totalBalance, tokens } = useWeb3();

  return (
    <AppLayout
      title="Portfolio Intelligence"
      subtitle="Real-time performance analytics, asset allocation, and multi-chain valuation."
    >
      {/* PORTFOLIO HERO STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          <span className="text-xs font-medium text-slate-400 block mb-1">Total Net Worth</span>
          <div className="text-3xl font-extrabold font-mono text-white">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.84% ($680.40) in the last 24 hours</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          <span className="text-xs font-medium text-slate-400 block mb-1">30-Day Realized Yield</span>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            +$248.50
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            From liquidity pool lending & staking
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          <span className="text-xs font-medium text-slate-400 block mb-1">Portfolio Health & Risk</span>
          <div className="text-3xl font-extrabold font-mono text-white">
            94 / 100
          </div>
          <span className="text-xs text-emerald-400 mt-2 block font-medium">
            Tier: Low Volatility (62% Stablecoins)
          </span>
        </div>
      </div>

      {/* RECHARTS PERFORMANCE CHART */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm mb-8">
        <PortfolioChart initialTimeframe="30D" />
      </div>

      {/* ASSET ALLOCATION & HOLDINGS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donut Chart */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Asset Allocation</h3>
            <p className="text-xs text-slate-400 mb-6">Target portfolio diversification</p>
            <AssetAllocationChart />
          </div>
          <div className="mt-6 p-3 rounded-xl bg-[#141B29] border border-white/5 text-[11px] text-slate-300">
            Balanced allocation provides steady collateral cushion for undercollateralized credit underwriting.
          </div>
        </div>

        {/* Detailed Tokens Table (2 cols) */}
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
          <h3 className="text-sm font-bold text-white mb-1">Holdings Detail</h3>
          <p className="text-xs text-slate-400 mb-5">Live price feeds and balances</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Asset</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">24h Change</th>
                  <th className="pb-3 font-semibold">Balance</th>
                  <th className="pb-3 font-semibold text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tokens.map((token) => (
                  <tr key={token.symbol} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-semibold text-white flex items-center gap-3">
                      <span className="text-xl">{token.icon}</span>
                      <div>
                        <span className="block font-bold">{token.name}</span>
                        <span className="text-[11px] text-slate-400">{token.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-slate-200">
                      ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${
                          token.change24h >= 0
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {token.change24h >= 0 ? `+${token.change24h}%` : `${token.change24h}%`}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-slate-300">
                      {token.balance.toLocaleString()} {token.symbol}
                    </td>
                    <td className="py-4 font-mono font-bold text-right text-white">
                      ${token.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
