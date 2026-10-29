'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { LoansOverviewDto, CreateLoanRequest, LoanDto } from '@/types/api';
import { useToast } from '@/context/ToastContext';
import confetti from 'canvas-confetti';

export function useLending() {
  const { addToast } = useToast();
  const [overview, setOverview] = useState<LoansOverviewDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.loans.get();
      setOverview(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to load credit facility metrics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const requestLoan = useCallback(
    async (requestData: CreateLoanRequest): Promise<boolean> => {
      setIsSubmitting(true);
      try {
        const newLoan = await api.loans.create(requestData);

        // Update UI state reactively without page reload
        setOverview((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            availableCredit: Math.max(0, prev.availableCredit - newLoan.principalAmount),
            currentBorrowed: prev.currentBorrowed + newLoan.principalAmount,
            activeLoans: [newLoan, ...prev.activeLoans],
          };
        });

        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#10B981', '#6366F1', '#38BDF8'],
          });
        } catch {
          // Fallback
        }

        addToast({
          type: 'success',
          title: 'Loan Disbursed',
          message: `Successfully originated $${newLoan.principalAmount.toLocaleString()} USDC credit facility.`,
        });

        return true;
      } catch (err: unknown) {
        const e = err as Error;
        addToast({
          type: 'error',
          title: 'Loan Request Failed',
          message: e.message || 'Could not process loan origination.',
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [addToast]
  );

  const repayLoan = useCallback(
    async (loanId: string, amount: number): Promise<boolean> => {
      setIsSubmitting(true);
      try {
        const updatedLoan = await api.loans.repay(loanId, amount);

        // Update UI state reactively without page reload
        setOverview((prev) => {
          if (!prev) return null;
          const updatedActive = prev.activeLoans
            .map((l) => (l.id === loanId ? updatedLoan : l))
            .filter((l) => l.status === 'ACTIVE');

          const updatedHistorical =
            updatedLoan.status === 'REPAID'
              ? [updatedLoan, ...prev.historicalLoans]
              : prev.historicalLoans;

          return {
            ...prev,
            currentBorrowed: Math.max(0, prev.currentBorrowed - amount),
            availableCredit: prev.availableCredit + amount,
            repaymentProgress: Math.min(100, prev.repaymentProgress + 4),
            activeLoans: updatedActive,
            historicalLoans: updatedHistorical,
          };
        });

        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#34D399', '#6366F1'],
          });
        } catch {
          // Fallback
        }

        addToast({
          type: 'success',
          title: 'Repayment Confirmed (+6 Trust Score)',
          message: `Repaid $${amount.toLocaleString()} USDC. Your Trust Score increased!`,
        });

        return true;
      } catch (err: unknown) {
        const e = err as Error;
        addToast({
          type: 'error',
          title: 'Repayment Failed',
          message: e.message || 'Could not process loan repayment.',
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [addToast]
  );

  return {
    overview,
    isLoading,
    isSubmitting,
    error,
    requestLoan,
    repayLoan,
    refetch: fetchLoans,
  };
}
