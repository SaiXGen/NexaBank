'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Clock,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useTransactions } from '@/hooks/useTransactions';
import { useToast } from '@/context/ToastContext';
import { TransactionDetailModal } from '@/components/modals/TransactionDetailModal';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { Transaction } from '@/types';

export default function TransactionsPage() {
  const { transactions, isLoading, error, updateFilters, refetch } = useTransactions();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    updateFilters({ category: val === 'All' ? undefined : val });
  };

  const handleAssetChange = (val: string) => {
    setSelectedAsset(val);
    updateFilters({ asset: val === 'All' ? undefined : val });
  };

  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
    updateFilters({ status: val === 'All' ? undefined : val });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.asset.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'All' || tx.category === selectedCategory;
      const matchAsset = selectedAsset === 'All' || tx.asset.includes(selectedAsset);
      const matchStatus = selectedStatus === 'All' || tx.status === selectedStatus;

      return matchSearch && matchCategory && matchAsset && matchStatus;
    });
  }, [transactions, searchTerm, selectedCategory, selectedAsset, selectedStatus]);

  const handleExportCSV = () => {
    const headers = 'ID,Title,Type,Asset,Amount,ValueUSD,Status,Date,Network,TxHash\n';
    const rows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.title}","${t.type}","${t.asset}",${t.amount},${t.valueUsd},"${t.status}","${t.date}","${t.network}","${t.txHash}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexafi-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    addToast({
      type: 'success',
      title: 'CSV Exported',
      message: `Exported ${filteredTransactions.length} transaction records from the ledger.`,
    });
  };

  return (
    <AppLayout
      title="Transactions Ledger"
      subtitle="Complete chronological audit log of all protocol and wallet operations."
    >
      {error ? (
        <ErrorState
          title="Failed to Load Ledger Data"
          message={error}
          onRetry={refetch}
          className="mb-8"
        />
      ) : null}

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0E131E] border border-white/[0.08] mb-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by title, hash, or asset..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141B29] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#141B29] border border-white/10 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Lending">Lending & Credit</option>
              <option value="Transfers">Transfers</option>
              <option value="DeFi">DeFi & Yield</option>
              <option value="Trading">Trading & Swaps</option>
            </select>
          </div>

          {/* Asset Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Asset</label>
            <select
              value={selectedAsset}
              onChange={(e) => handleAssetChange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#141B29] border border-white/10 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Assets</option>
              <option value="USDC">USDC</option>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#141B29] border border-white/10 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="p-6 rounded-3xl bg-[#0E131E] border border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Ledger ({filteredTransactions.length} Records)
          </span>
          <span className="text-[11px] text-slate-400">Click any row for cryptographic details</span>
        </div>

        {isLoading ? (
          <div className="space-y-1">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-14 text-center">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">No Transactions Found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Type & Title</th>
                  <th className="pb-3 font-semibold">Asset</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Value (USD)</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Network</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 font-medium text-white flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                          tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {tx.amount > 0 ? '+' : '-'}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">{tx.title}</span>
                        <span className="text-[10px] text-slate-400">{tx.category}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-300 font-medium">{tx.asset}</td>
                    <td className="py-3.5 font-mono font-bold">
                      <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-slate-300">
                      ${tx.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full font-medium text-[11px] border ${
                          tx.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : tx.status === 'Pending'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">{tx.network}</td>
                    <td className="py-3.5 text-slate-400 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3.5 text-right font-mono text-emerald-400 hover:text-emerald-300">
                      {tx.txHash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TransactionDetailModal
        transaction={selectedTx}
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </AppLayout>
  );
}
