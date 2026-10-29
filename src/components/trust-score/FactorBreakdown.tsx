'use client';

import React from 'react';
import { TrustFactor } from '@/types';

interface FactorBreakdownProps {
  factors: TrustFactor[];
}

export function FactorBreakdown({ factors }: FactorBreakdownProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {factors.map((factor) => (
        <div
          key={factor.name}
          className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] hover:border-white/15 transition-all shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-white">{factor.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-semibold">
                Weight: {factor.weight}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold font-mono text-emerald-400">{factor.score}%</span>
              <span className="text-[11px] text-slate-400">Target: &gt;80%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-3">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${factor.score}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{factor.description}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Status</span>
            <span className="text-emerald-400 font-semibold uppercase">{factor.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
