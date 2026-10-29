'use client';

import React from 'react';
import { TrustTimelineItem } from '@/types';

interface ScoreTimelineProps {
  timeline: TrustTimelineItem[];
}

export function ScoreTimeline({ timeline }: ScoreTimelineProps) {
  return (
    <div className="space-y-3">
      {timeline.map((item) => (
        <div
          key={item.id}
          className="p-3.5 rounded-xl bg-[#141B29] border border-white/5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-xs ${
                item.positive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {item.change}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">{item.reason}</h4>
              <span className="text-[11px] text-slate-400 capitalize">{item.category} Event</span>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-mono shrink-0">{item.timestamp}</span>
        </div>
      ))}
    </div>
  );
}
