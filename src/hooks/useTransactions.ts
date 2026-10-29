'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { Transaction } from '@/types';

interface TransactionFilterParams {
  category?: string;
  asset?: string;
  status?: string;
}

export function useTransactions(initialFilters?: TransactionFilterParams) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilterParams>(initialFilters || {});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.transactions.get(filters);
      setTransactions(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to load transaction ledger');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const updateFilters = (newFilters: Partial<TransactionFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    transactions,
    isLoading,
    error,
    filters,
    updateFilters,
    refetch: fetchTransactions,
  };
}
