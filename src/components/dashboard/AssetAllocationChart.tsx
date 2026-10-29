'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AllocationItem {
  name: string;
  symbol: string;
  value: number; // percentage
  amountUsd: number;
  color: string;
}

export function AssetAllocationChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data: AllocationItem[] = [
    { name: 'Ethereum', symbol: 'ETH', value: 42, amountUsd: 10437, color: '#6366F1' },
    { name: 'USD Coin', symbol: 'USDC', value: 32, amountUsd: 7952, color: '#10B981' },
    { name: 'Bitcoin', symbol: 'BTC', value: 20, amountUsd: 4970, color: '#F59E0B' },
    { name: 'Other / Yield', symbol: 'OTHER', value: 6, amountUsd: 1491, color: '#06B6D4' },
  ];

  if (!isMounted) {
    return <div className="h-48 w-full bg-[#121824] animate-pulse rounded-xl" />;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Donut Chart */}
      <div className="h-44 w-44 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as AllocationItem;
                  return (
                    <div className="p-2 rounded-lg bg-[#0E131E] border border-white/10 text-xs shadow-lg">
                      <p className="font-semibold text-white">{item.name} ({item.symbol})</p>
                      <p className="text-emerald-400 font-mono font-bold">
                        {item.value}% (${item.amountUsd.toLocaleString()})
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] text-slate-400">Total</span>
          <span className="text-xs font-bold text-white font-mono">100%</span>
        </div>
      </div>

      {/* Breakdown Legend */}
      <div className="flex-1 w-full space-y-2">
        {data.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between p-2 rounded-lg bg-[#0E131E]/60 border border-white/5 text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-medium text-slate-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono">${item.amountUsd.toLocaleString()}</span>
              <span className="font-bold text-white font-mono w-9 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
