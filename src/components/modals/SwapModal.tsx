'use client';

import React, { useState } from 'react';
import { X, ArrowDownUp, RefreshCw, Settings, Sparkles } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SwapModal({ isOpen, onClose }: SwapModalProps) {
  const { tokens, swapTokens } = useWeb3();
  const [fromSymbol, setFromSymbol] = useState('ETH');
  const [toSymbol, setToSymbol] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  if (!isOpen) return null;

  const fromToken = tokens.find((t) => t.symbol === fromSymbol) || tokens[1];
  const toToken = tokens.find((t) => t.symbol === toSymbol) || tokens[0];

  const parsedAmount = parseFloat(amount) || 0;
  const estimatedReceived =
    fromToken && toToken && parsedAmount > 0
      ? ((parsedAmount * fromToken.price) / toToken.price).toFixed(4)
      : '0.00';

  const handleInvert = () => {
    setFromSymbol(toSymbol);
    setToSymbol(fromSymbol);
    setAmount('');
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) return;

    setIsSwapping(true);
    const success = await swapTokens(fromSymbol, toSymbol, parsedAmount);
    setIsSwapping(false);

    if (success) {
      setAmount('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0E131E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ArrowDownUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Instant Swap</h3>
            <p className="text-xs text-slate-400">DEX liquidity router with optimal slippage</p>
          </div>
        </div>

        <form onSubmit={handleSwap} className="space-y-3">
          {/* From Card */}
          <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/10">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
              <span>You Pay</span>
              <span>
                Balance: {fromToken.balance.toLocaleString()} {fromToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <input
                type="number"
                step="any"
                min="0.0001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-transparent text-xl font-bold text-white placeholder:text-slate-600 focus:outline-none"
              />
              <select
                value={fromSymbol}
                onChange={(e) => setFromSymbol(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#1A2335] text-xs font-semibold text-white border border-white/10 focus:outline-none"
              >
                {tokens.map((t) => (
                  <option key={t.symbol} value={t.symbol}>
                    {t.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              ≈ ${(parsedAmount * fromToken.price).toLocaleString()} USD
            </div>
          </div>

          {/* Invert button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={handleInvert}
              className="p-2 rounded-xl bg-[#1A2335] border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all shadow-md"
            >
              <ArrowDownUp className="w-4 h-4" />
            </button>
          </div>

          {/* To Card */}
          <div className="p-3.5 rounded-xl bg-[#141B29] border border-white/10">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
              <span>You Receive (Estimated)</span>
              <span>
                Balance: {toToken.balance.toLocaleString()} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-xl font-bold text-emerald-400">{estimatedReceived}</div>
              <select
                value={toSymbol}
                onChange={(e) => setToSymbol(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#1A2335] text-xs font-semibold text-white border border-white/10 focus:outline-none"
              >
                {tokens.map((t) => (
                  <option key={t.symbol} value={t.symbol}>
                    {t.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}
            </div>
          </div>

          {/* Swap Details */}
          <div className="p-3 rounded-xl bg-[#141B29]/60 border border-white/5 space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Routing Protocol</span>
              <span className="text-slate-300 font-medium">Uniswap v3 Multi-Hop</span>
            </div>
            <div className="flex justify-between">
              <span>Max Slippage</span>
              <span className="text-slate-300 font-medium">0.5% (Auto)</span>
            </div>
            <div className="flex justify-between">
              <span>Network Fee</span>
              <span className="text-slate-300 font-medium">~$1.25</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSwapping || parsedAmount <= 0 || fromSymbol === toSymbol}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isSwapping ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing Swap...
              </span>
            ) : (
              <span>Swap Tokens</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
