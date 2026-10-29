'use client';

import React, { useState } from 'react';
import { X, Users, Shield, Sparkles } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface CreateCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; description: string; category: string; stakeAmount: number }) => Promise<boolean>;
}

export function CreateCircleModal({ isOpen, onClose, onSubmit }: CreateCircleModalProps) {
  const { createTrustCircle, tokens } = useWeb3();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Web3 Founders & Builders');
  const [description, setDescription] = useState('');
  const [stake, setStake] = useState('1000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const usdcToken = tokens.find((t) => t.symbol === 'USDC');
  const parsedStake = parseFloat(stake) || 0;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || parsedStake <= 0) return;

    setIsSubmitting(true);
    let success = false;
    if (onSubmit) {
      success = await onSubmit({
        name,
        description,
        category,
        stakeAmount: parsedStake,
      });
    } else {
      success = await createTrustCircle(name, description, category, parsedStake);
    }
    setIsSubmitting(false);

    if (success) {
      setName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0E131E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Create a Trust Circle</h3>
            <p className="text-xs text-slate-400">Establish a community-backed credit & underwriting cohort</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Circle Name</label>
            <input
              type="text"
              placeholder="e.g. Zero-Knowledge Researchers Cohort"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-indigo-500/60"
            >
              <option value="Web3 Founders & Builders">Web3 Founders & Builders</option>
              <option value="Smart Contract Engineers">Smart Contract Engineers</option>
              <option value="Security & Audit Guild">Security & Audit Guild</option>
              <option value="DeFi Liquidity Providers">DeFi Liquidity Providers</option>
              <option value="Regional DAO Members">Regional DAO Members</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Description & Guidelines</label>
            <textarea
              rows={3}
              placeholder="Describe the membership criteria and mutual guarantee rules..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500/60 resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">Founder Initial Staked Guarantee</label>
              <span className="text-[11px] text-slate-400">
                Available: {usdcToken?.balance.toLocaleString()} USDC
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="500"
                step="100"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                required
                className="w-full pl-8 pr-16 py-2.5 rounded-xl bg-[#141B29] border border-white/10 text-white text-base font-semibold focus:outline-none focus:border-indigo-500/60"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">USDC</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              The founder stake forms the anchor liquidity pool. Minimum 500 USDC.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name || parsedStake < 500}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deploying Circle Smart Contract...
              </span>
            ) : (
              <span>Deploy Circle with {parsedStake} USDC Stake</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
