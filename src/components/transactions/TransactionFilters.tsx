'use client';

import React from 'react';
import { Search, Download } from 'lucide-react';

interface TransactionFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedAsset: string;
  onAssetChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  onExport: () => void;
}

export function TransactionFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedAsset,
  onAssetChange,
  selectedStatus,
  onStatusChange,
  onExport,
}: TransactionFiltersProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] mb-6 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by title, hash, or asset..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        <button
          onClick={onExport}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-[#141B29] border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Lending">Lending & Credit</option>
            <option value="Transfers">Transfers</option>
            <option value="DeFi">DeFi & Yield</option>
            <option value="Trading">Trading & Swaps</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Asset</label>
          <select
            value={selectedAsset}
            onChange={(e) => onAssetChange(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-[#141B29] border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="All">All Assets</option>
            <option value="USDC">USDC</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-[#141B29] border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
