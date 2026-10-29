'use client';

import React from 'react';
import { TokenBalance } from '@/types';

interface TokenListProps {
  tokens: TokenBalance[];
  onSendToken?: (symbol: string) => void;
  onTradeToken?: (symbol: string) => void;
}

export function TokenList({ tokens, onSendToken, onTradeToken }: TokenListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tokens.map((token) => (
        <div
          key={token.symbol}
          className="p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] hover:border-white/20 transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{token.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-white">{token.symbol}</h4>
                <span className="text-xs text-slate-400">{token.name}</span>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                token.change24h >= 0
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              {token.change24h >= 0 ? `+${token.change24h}%` : `${token.change24h}%`}
            </span>
          </div>

          <div>
            <div className="text-xl font-bold font-mono text-white">
              ${token.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span>
                {token.balance.toLocaleString()} {token.symbol}
              </span>
              <span>${token.price.toLocaleString()} / unit</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
            <button
              onClick={() => onSendToken?.(token.symbol)}
              className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
            >
              Send
            </button>
            <button
              onClick={() => onTradeToken?.(token.symbol)}
              className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
            >
              Trade
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
