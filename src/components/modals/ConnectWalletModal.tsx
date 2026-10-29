'use client';

import React from 'react';
import { X, Wallet, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { isConnected, address, isDemo, connectDemoWallet, connectInjectedWallet, disconnectWallet } = useWeb3();

  if (!isOpen) return null;

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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Connect Web3 Account</h3>
            <p className="text-xs text-slate-400">Choose your connection method</p>
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#141B29] border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Connected ({isDemo ? 'Demo Mode' : 'Live EVM'})
                </span>
                <span className="text-[11px] font-mono text-slate-400">Ethereum Mainnet</span>
              </div>
              <p className="mt-2 text-sm font-mono font-medium text-white break-all">{address}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  disconnectWallet();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                Disconnect Session
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* 1-Click Instant Demo option */}
            <button
              onClick={() => {
                connectDemoWallet();
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-500/60 transition-all group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white">Instant Demo Account</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Prefunded $24.8k assets, 842 Trust Score</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Injected Browser Extension (MetaMask, Rabby, Coinbase) */}
            <button
              onClick={async () => {
                await connectInjectedWallet();
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#141B29] hover:bg-[#1A2335] hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                  🦊
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">MetaMask / Injected</h4>
                  <p className="text-xs text-slate-400">Connect using browser extension</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* WalletConnect */}
            <button
              onClick={() => {
                connectDemoWallet();
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#141B29] hover:bg-[#1A2335] hover:border-white/15 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                  🌐
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">WalletConnect</h4>
                  <p className="text-xs text-slate-400">Scan with mobile crypto wallet</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Non-custodial. Your keys remain yours at all times.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
