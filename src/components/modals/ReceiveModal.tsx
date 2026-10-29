'use client';

import React, { useState } from 'react';
import { X, Copy, Check, QrCode, AlertTriangle, ExternalLink } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { useToast } from '@/context/ToastContext';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiveModal({ isOpen, onClose }: ReceiveModalProps) {
  const { address, network } = useWeb3();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Address Copied',
      message: 'Wallet address copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0E131E] p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-semibold text-white">Receive Digital Assets</h3>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Deposit supported tokens to your non-custodial NexaFi account
        </p>

        {/* QR Code visual */}
        <div className="mx-auto w-48 h-48 bg-white p-3 rounded-2xl flex items-center justify-center shadow-lg relative group">
          <div className="w-full h-full border-4 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50">
            {/* SVG stylized QR code representation */}
            <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
              <rect x="10" y="10" width="25" height="25" fill="#0E131E" rx="3" />
              <rect x="15" y="15" width="15" height="15" fill="white" rx="1" />
              <rect x="18" y="18" width="9" height="9" fill="#0E131E" />
              
              <rect x="65" y="10" width="25" height="25" fill="#0E131E" rx="3" />
              <rect x="70" y="15" width="15" height="15" fill="white" rx="1" />
              <rect x="73" y="18" width="9" height="9" fill="#0E131E" />
              
              <rect x="10" y="65" width="25" height="25" fill="#0E131E" rx="3" />
              <rect x="15" y="70" width="15" height="15" fill="white" rx="1" />
              <rect x="18" y="73" width="9" height="9" fill="#0E131E" />
              
              <rect x="42" y="15" width="6" height="18" fill="#0E131E" />
              <rect x="52" y="22" width="6" height="18" fill="#0E131E" />
              <rect x="42" y="42" width="16" height="16" fill="#10B981" rx="2" />
              <rect x="65" y="45" width="18" height="6" fill="#0E131E" />
              <rect x="45" y="68" width="18" height="18" fill="#0E131E" />
              <rect x="70" y="70" width="20" height="20" fill="#0E131E" rx="2" />
            </svg>
          </div>
        </div>

        {/* Address Chip */}
        <div className="mt-5 p-3 rounded-xl bg-[#141B29] border border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-300 truncate max-w-[260px] text-left">
            {address}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-200/90 leading-tight">
            Only send EVM-compatible tokens (ETH, USDC, WBTC) on <strong>{network}</strong>. Sending unsupported assets may cause permanent loss.
          </p>
        </div>
      </div>
    </div>
  );
}
