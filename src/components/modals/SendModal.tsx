'use client';

import React, { useState } from 'react';
import { X, Send, ArrowUpRight, Zap, Check } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendModal({ isOpen, onClose }: SendModalProps) {
  const { tokens, sendTokens } = useWeb3();
  const [selectedSymbol, setSelectedSymbol] = useState('USDC');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speed, setSpeed] = useState<'eco' | 'normal' | 'fast'>('normal');

  if (!isOpen) return null;

  const currentToken = tokens.find((t) => t.symbol === selectedSymbol) || tokens[0];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    const success = await sendTokens(recipient, parseFloat(amount), selectedSymbol);
    setIsSubmitting(false);

    if (success) {
      setAmount('');
      setRecipient('');
      onClose();
    }
  };

  const handleMax = () => {
    setAmount(currentToken.balance.toString());
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
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Send Assets</h3>
            <p className="text-xs text-slate-400">Instant blockchain transfer</p>
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          {/* Asset Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Asset</label>
            <div className="grid grid-cols-3 gap-2">
              {tokens.map((token) => (
                <button
                  type="button"
                  key={token.symbol}
                  onClick={() => setSelectedSymbol(token.symbol)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedSymbol === token.symbol
                      ? 'border-emerald-500/60 bg-emerald-950/20 text-white'
                      : 'border-white/5 bg-[#141B29] text-slate-400 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{token.symbol}</span>
                    <span className="text-sm">{token.icon}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400 truncate">
                    {token.balance.toLocaleString()} {token.symbol}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Address / ENS */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Recipient Address or ENS</label>
            <input
              type="text"
              placeholder="0x... or name.eth"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 font-mono"
            />
          </div>

          {/* Amount */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">Amount</label>
              <button
                type="button"
                onClick={handleMax}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Max: {currentToken.balance.toLocaleString()} {currentToken.symbol}
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                min="0.0001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold">
                {currentToken.symbol}
              </span>
            </div>
          </div>

          {/* Network Gas Speed */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Speed / Gas Preference</label>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { id: 'eco', name: 'Eco', fee: '$0.05', time: '~1m' },
                { id: 'normal', name: 'Normal', fee: '$0.15', time: '~15s' },
                { id: 'fast', name: 'Priority', fee: '$0.40', time: '~3s' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSpeed(item.id as 'eco' | 'normal' | 'fast')}
                  className={`py-2 px-1 rounded-xl border text-xs transition-all ${
                    speed === item.id
                      ? 'border-indigo-500/60 bg-indigo-950/20 text-white'
                      : 'border-white/5 bg-[#141B29] text-slate-400 hover:border-white/15'
                  }`}
                >
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-400">{item.fee} • {item.time}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !recipient || !amount}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing Transaction...
              </span>
            ) : (
              <>
                <span>Confirm & Send</span>
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
