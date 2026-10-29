'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, ArrowRight } from 'lucide-react';

interface AiInsightCardProps {
  insight?: string;
}

export function AiInsightCard({
  insight = '“Nexa AI noticed that your repayment consistency improved by 8% this month, qualifying you for a 0.4% APR rate reduction on your next credit facility.”',
}: AiInsightCardProps) {
  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-[#101726] to-indigo-950/30 border border-emerald-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Nexa AI Insight</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              Real-Time
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">{insight}</p>
        </div>
      </div>
      <Link
        href="/ai-assistant"
        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors shrink-0 flex items-center gap-1.5"
      >
        <span>Ask Nexa AI</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
