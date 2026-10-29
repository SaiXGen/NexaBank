'use client';

import React from 'react';
import { Transaction } from '@/types';
import { EmptyState } from '@/components/ui/EmptyState';
import { Clock } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onSelectTx: (tx: Transaction) => void;
}

export function TransactionTable({ transactions, onSelectTx }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No Transactions Found"
        description="Try adjusting your keyword search or category filters to find records."
        icon={Clock}
      />
    );
  }

  return (
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
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              onClick={() => onSelectTx(tx)}
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
  );
}
