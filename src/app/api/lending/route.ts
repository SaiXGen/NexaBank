import { NextResponse } from 'next/server';
import { AVAILABLE_CREDIT, CURRENT_BORROWED, REPAYMENT_PROGRESS, INITIAL_LOANS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      availableCredit: AVAILABLE_CREDIT,
      currentBorrowed: CURRENT_BORROWED,
      repaymentProgress: REPAYMENT_PROGRESS,
      activeLoans: INITIAL_LOANS.filter((l) => l.status === 'active'),
      historicalLoans: INITIAL_LOANS.filter((l) => l.status === 'repaid'),
      protocolPoolLiquidity: 1450000,
      baseApr: 4.8,
    },
  });
}
