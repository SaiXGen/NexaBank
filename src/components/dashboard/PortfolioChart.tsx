'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PORTFOLIO_HISTORY } from '@/lib/mockData';

interface PortfolioChartProps {
  initialTimeframe?: '7D' | '30D' | '90D' | '1Y';
}

export function PortfolioChart({ initialTimeframe = '30D' }: PortfolioChartProps) {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>(initialTimeframe);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = PORTFOLIO_HISTORY[timeframe] || PORTFOLIO_HISTORY['30D'];

  const timeframes: ('7D' | '30D' | '90D' | '1Y')[] = ['7D', '30D', '90D', '1Y'];

  if (!isMounted) {
    return <div className="h-64 w-full bg-[#121824] animate-pulse rounded-xl" />;
  }

  return (
    <div className="w-full">
      {/* Timeframe Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xs text-slate-400">Historical Net Worth</span>
          <div className="text-xl font-bold font-mono text-white">
            ${data[data.length - 1].value.toLocaleString()}
          </div>
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-[#0E131E] border border-white/5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="p-3 rounded-xl bg-[#0E131E] border border-white/10 shadow-xl text-xs space-y-1">
                      <p className="font-semibold text-slate-300">{item.date}</p>
                      <p className="text-emerald-400 font-bold font-mono text-sm">
                        ${item.value.toLocaleString()}
                      </p>
                      <div className="pt-1 border-t border-white/5 text-[11px] text-slate-400 space-y-0.5">
                        <p>Stablecoins: ${item.stableValue?.toLocaleString()}</p>
                        <p>Ethereum: ${item.ethValue?.toLocaleString()}</p>
                        <p>Bitcoin: ${item.btcValue?.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
