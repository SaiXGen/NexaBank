'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import {
  UserProfileDto,
  WalletDto,
  TrustScoreDto,
  LoansOverviewDto,
} from '@/types/api';
import { Transaction } from '@/types';

export interface DashboardData {
  user: UserProfileDto | null;
  wallet: WalletDto | null;
  trustScore: TrustScoreDto | null;
  loans: LoansOverviewDto | null;
  transactions: Transaction[];
  portfolioChartData: any[];
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    user: null,
    wallet: null,
    trustScore: null,
    loans: null,
    transactions: [],
    portfolioChartData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [user, wallet, trustScore, loans, transactions, portfolio] = await Promise.all([
        api.user.get(),
        api.wallet.get(),
        api.trustScore.get(),
        api.loans.get(),
        api.transactions.get(),
        api.portfolio.get('30D'),
      ]);

      setData({
        user,
        wallet,
        trustScore,
        loans,
        transactions,
        portfolioChartData: portfolio.chartData || [],
      });
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to fetch dashboard telemetry');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
