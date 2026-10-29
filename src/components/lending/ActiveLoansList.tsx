'use client';

import React from 'react';
import { Loan } from '@/types';
import { LoanCard } from './LoanCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Coins } from 'lucide-react';

interface ActiveLoansListProps {
  loans: Loan[];
  onRepay: (id: string) => void;
  onRequestLoan: () => void;
}

export function ActiveLoansList({ loans, onRepay, onRequestLoan }: ActiveLoansListProps) {
  if (loans.length === 0) {
    return (
      <EmptyState
        title="No Active Borrowings"
        description="You currently have zero active debt. Tap into your pre-approved uncollateralized credit line anytime."
        icon={Coins}
        actionText="Request Loan"
        onAction={onRequestLoan}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} onRepay={onRepay} />
      ))}
    </div>
  );
}
