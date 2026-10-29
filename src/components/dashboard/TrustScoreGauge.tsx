'use client';

import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface TrustScoreGaugeProps {
  score: number;
  maxScore?: number;
  rating?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TrustScoreGauge({
  score = 842,
  maxScore = 1000,
  rating = 'Excellent',
  size = 'md',
}: TrustScoreGaugeProps) {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  const radius = size === 'lg' ? 95 : size === 'md' ? 70 : 45;
  const strokeWidth = size === 'lg' ? 14 : size === 'md' ? 10 : 7;
  const circumference = 2 * Math.PI * radius;
  // Use a 270-degree arc for a classic gauge appearance
  const strokeDashoffset = circumference - (percentage / 100) * (circumference * 0.75);

  const dimension = radius * 2 + strokeWidth * 2 + 10;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative flex items-center justify-center" style={{ width: dimension, height: dimension }}>
        <svg
          width={dimension}
          height={dimension}
          className="transform -rotate-135"
        >
          {/* Background track */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/10"
            fill="transparent"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />

          {/* Foreground gradient arc */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="url(#trustGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          <defs>
            <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`${size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-3xl' : 'text-xl'} font-bold font-mono text-white tracking-tight`}>
            {score}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">/ {maxScore}</span>
          <span className="mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
}
