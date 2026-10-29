import { prisma } from '@/lib/prisma';
import {
  UserProfileDto,
  WalletDto,
  TrustScoreDto,
  TrustCircleDto,
  LoansOverviewDto,
  LoanDto,
  CreateTrustCircleRequest,
  CreateLoanRequest,
} from '@/types/api';

// Memory seed fallback to guarantee 100% immediate demo availability
const memoryStore = {
  user: {
    id: 'usr-demo-001',
    username: 'alexvance',
    email: 'alex@nexafi.io',
    ensName: 'alex.nexafi.eth',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    primaryAddress: '0x71C83e58b142828bF93F2',
    createdAt: new Date().toISOString(),
  },
  wallet: {
    address: '0x71C83e58b142828bF93F2',
    network: 'Ethereum',
    totalBalanceUsd: 24850.4,
    tokens: [
      { symbol: 'USDC', name: 'USD Coin', balance: 12400.0, priceUsd: 1.0, valueUsd: 12400.0, change24h: 0.02, icon: '💵', allocationPct: 49.9 },
      { symbol: 'BTC', name: 'Bitcoin (Wrapped)', balance: 0.1257, priceUsd: 65000.0, valueUsd: 8170.0, change24h: 2.45, icon: '₿', allocationPct: 32.9 },
      { symbol: 'ETH', name: 'Ethereum', balance: 1.223, priceUsd: 3500.0, valueUsd: 4280.4, change24h: 3.12, icon: '⟠', allocationPct: 17.2 },
    ],
  },
  trustScore: {
    score: 842,
    paymentReliability: 92,
    walletActivity: 84,
    financialConsistency: 88,
    circleReputation: 79,
    assetStability: 86,
    ratingTier: 'Excellent',
    maxCreditLine: 8500.0,
    updatedAt: new Date().toISOString(),
  },
  circles: [
    {
      id: 'circle-1',
      name: 'Tech Builders Circle',
      description: 'Curated peer-lending cohort of verified Web3 software engineers and founders with shared mutual stake.',
      category: 'Developers & Founders',
      circleTrustScore: 91,
      totalCapitalPooled: 120000.0,
      activeLoansCount: 7,
      historicalRepaymentPct: 98.2,
      membersCount: 24,
      userIsMember: true,
      userRole: 'Member',
    },
    {
      id: 'circle-2',
      name: 'Protocol Researchers Guild',
      description: 'Cryptographic researchers and smart contract auditors backing research grants with zero liquidations.',
      category: 'Security & Audit',
      circleTrustScore: 95,
      totalCapitalPooled: 250000.0,
      activeLoansCount: 4,
      historicalRepaymentPct: 100.0,
      membersCount: 18,
      userIsMember: false,
      userRole: 'None',
    },
    {
      id: 'circle-3',
      name: 'DeFi Liquidity Providers',
      description: 'Active liquidity providers optimizing cross-chain capital efficiency and mutual credit backstops.',
      category: 'Institutional DeFi',
      circleTrustScore: 89,
      totalCapitalPooled: 480000.0,
      activeLoansCount: 12,
      historicalRepaymentPct: 97.4,
      membersCount: 31,
      userIsMember: false,
      userRole: 'None',
    },
  ],
  loans: [
    {
      id: 'LN-8402',
      principalAmount: 2000.0,
      borrowedAsset: 'USDC',
      interestRateApr: 4.8,
      durationDays: 90,
      collateralRatio: 15.0,
      collateralAmount: 300.0,
      collateralAsset: 'USDC',
      status: 'ACTIVE' as const,
      purpose: 'Node validator expansion',
      amountRepaid: 1520.0,
      totalDue: 2024.0,
      dueDate: new Date(Date.now() + 50 * 24 * 3600 * 1000).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - 40 * 24 * 3600 * 1000).toISOString().split('T')[0],
    },
    {
      id: 'LN-7109',
      principalAmount: 3500.0,
      borrowedAsset: 'USDC',
      interestRateApr: 5.2,
      durationDays: 60,
      collateralRatio: 20.0,
      collateralAmount: 700.0,
      collateralAsset: 'ETH',
      status: 'REPAID' as const,
      purpose: 'Contract audit fee pre-funding',
      amountRepaid: 3545.5,
      totalDue: 3545.5,
      dueDate: '2024-07-10',
      createdAt: '2024-05-10',
    },
  ] as LoanDto[],
  transactions: [
    {
      id: 'tx-001',
      type: 'LOAN_REPAYMENT' as const,
      title: 'Loan Repayment',
      asset: 'USDC',
      amount: 500.0,
      valueUsd: 500.0,
      status: 'COMPLETED' as const,
      date: 'Today, 2:45 PM',
      txHash: '0x8f2a492b9101',
      network: 'Ethereum',
      gasFee: 1.42,
      category: 'Lending',
    },
    {
      id: 'tx-002',
      type: 'USDC_TRANSFER' as const,
      title: 'USDC Transfer',
      asset: 'USDC',
      amount: -250.0,
      valueUsd: 250.0,
      status: 'COMPLETED' as const,
      date: 'Yesterday, 6:18 PM',
      txHash: '0x3e1d99ac8120',
      network: 'Base',
      gasFee: 0.08,
      category: 'Transfers',
    },
    {
      id: 'tx-003',
      type: 'YIELD_DEPOSIT' as const,
      title: 'Yield Deposit',
      asset: 'USDC',
      amount: 84.0,
      valueUsd: 84.0,
      status: 'COMPLETED' as const,
      date: 'Sep 22, 2024',
      txHash: '0x99a110fe5841',
      network: 'Arbitrum',
      gasFee: 0.12,
      category: 'DeFi',
    },
  ],
};

export const dbService = {
  async getUser(): Promise<UserProfileDto> {
    try {
      const u = await prisma.user.findFirst({
        include: { wallets: true },
      });
      if (u) {
        return {
          id: u.id,
          username: u.username || 'alexvance',
          email: u.email || undefined,
          ensName: u.ensName || 'alex.nexafi.eth',
          avatarUrl: u.avatarUrl || memoryStore.user.avatarUrl,
          primaryAddress: u.wallets[0]?.address || memoryStore.user.primaryAddress,
          createdAt: u.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback to memoryStore
    }
    return memoryStore.user;
  },

  async getWallet(): Promise<WalletDto> {
    try {
      const w = await prisma.wallet.findFirst({
        where: { isPrimary: true },
      });
      const assets = await prisma.asset.findMany();
      if (w && assets.length > 0) {
        const total = assets.reduce((sum, a) => sum + a.valueUsd, 0);
        return {
          address: w.address,
          network: w.network,
          totalBalanceUsd: total,
          tokens: assets.map((a) => ({
            symbol: a.symbol,
            name: a.name,
            balance: a.balance,
            priceUsd: a.priceUsd,
            valueUsd: a.valueUsd,
            change24h: a.change24h,
            icon: a.icon,
            allocationPct: a.allocationPct,
          })),
        };
      }
    } catch {
      // Fallback
    }
    return memoryStore.wallet;
  },

  async getTrustScore(): Promise<TrustScoreDto> {
    try {
      const score = await prisma.trustScore.findFirst();
      if (score) {
        return {
          score: score.score,
          paymentReliability: score.paymentReliability,
          walletActivity: score.walletActivity,
          financialConsistency: score.financialConsistency,
          circleReputation: score.circleReputation,
          assetStability: score.assetStability,
          ratingTier: score.ratingTier,
          maxCreditLine: score.maxCreditLine,
          updatedAt: score.updatedAt.toISOString(),
        };
      }
    } catch {
      // Fallback
    }
    return memoryStore.trustScore;
  },

  async getTrustCircles(): Promise<TrustCircleDto[]> {
    try {
      const circles = await prisma.trustCircle.findMany({
        include: { members: true },
      });
      if (circles && circles.length > 0) {
        return circles.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          category: c.category,
          circleTrustScore: c.circleTrustScore,
          totalCapitalPooled: c.totalCapitalPooled,
          activeLoansCount: c.activeLoansCount,
          historicalRepaymentPct: c.historicalRepaymentPct,
          membersCount: c.members.length,
          userIsMember: c.members.some((m) => m.userId === memoryStore.user.id),
          userRole: c.members.find((m) => m.userId === memoryStore.user.id)?.role || 'None',
        }));
      }
    } catch {
      // Fallback
    }
    return memoryStore.circles;
  },

  async createTrustCircle(input: CreateTrustCircleRequest): Promise<TrustCircleDto> {
    try {
      const u = await prisma.user.findFirst();
      const circle = await prisma.trustCircle.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          circleTrustScore: 95,
          totalCapitalPooled: input.stakeAmount,
          activeLoansCount: 0,
          historicalRepaymentPct: 100.0,
          ...(u ? {
            members: {
              create: {
                userId: u.id,
                role: 'Founder',
                stakedContribution: input.stakeAmount,
              },
            },
          } : {}),
        },
        include: { members: true },
      });
      return {
        id: circle.id,
        name: circle.name,
        description: circle.description,
        category: circle.category,
        circleTrustScore: circle.circleTrustScore,
        totalCapitalPooled: circle.totalCapitalPooled,
        activeLoansCount: circle.activeLoansCount,
        historicalRepaymentPct: circle.historicalRepaymentPct,
        membersCount: circle.members.length,
        userIsMember: true,
        userRole: 'Founder',
      };
    } catch {
      // Fallback to memoryStore
    }

    const id = `circle-${Date.now()}`;
    const newCircle: TrustCircleDto = {
      id,
      name: input.name,
      description: input.description,
      category: input.category,
      circleTrustScore: 95,
      totalCapitalPooled: input.stakeAmount,
      activeLoansCount: 0,
      historicalRepaymentPct: 100.0,
      membersCount: 1,
      userIsMember: true,
      userRole: 'Founder',
    };

    memoryStore.circles.unshift(newCircle);
    return newCircle;
  },

  async getLoansOverview(): Promise<LoansOverviewDto> {
    try {
      const dbLoans = await prisma.loan.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbLoans && dbLoans.length > 0) {
        const active: LoanDto[] = dbLoans
          .filter((l) => l.status === 'ACTIVE')
          .map((l) => ({
            id: l.id,
            principalAmount: l.principalAmount,
            borrowedAsset: l.borrowedAsset,
            interestRateApr: l.interestRateApr,
            durationDays: l.durationDays,
            collateralRatio: l.collateralRatio,
            collateralAmount: l.collateralAmount,
            collateralAsset: l.collateralAsset || undefined,
            status: 'ACTIVE',
            purpose: l.purpose,
            amountRepaid: l.amountRepaid,
            totalDue: l.totalDue,
            dueDate: l.dueDate.toISOString().split('T')[0],
            createdAt: l.createdAt.toISOString().split('T')[0],
          }));

        const repaid: LoanDto[] = dbLoans
          .filter((l) => l.status === 'REPAID')
          .map((l) => ({
            id: l.id,
            principalAmount: l.principalAmount,
            borrowedAsset: l.borrowedAsset,
            interestRateApr: l.interestRateApr,
            durationDays: l.durationDays,
            collateralRatio: l.collateralRatio,
            collateralAmount: l.collateralAmount,
            collateralAsset: l.collateralAsset || undefined,
            status: 'REPAID',
            purpose: l.purpose,
            amountRepaid: l.amountRepaid,
            totalDue: l.totalDue,
            dueDate: l.dueDate.toISOString().split('T')[0],
            createdAt: l.createdAt.toISOString().split('T')[0],
          }));

        const currentBorrowed = active.reduce((sum, l) => sum + (l.totalDue - l.amountRepaid), 0);
        const score = await prisma.trustScore.findFirst();
        const maxCredit = score?.maxCreditLine || 12500;
        return {
          availableCredit: Math.max(0, maxCredit - currentBorrowed),
          currentBorrowed,
          repaymentProgress: 76,
          activeLoans: active,
          historicalLoans: repaid,
        };
      }
    } catch {
      // Fallback
    }

    const active = memoryStore.loans.filter((l) => l.status === 'ACTIVE');
    const repaid = memoryStore.loans.filter((l) => l.status === 'REPAID');
    const currentBorrowed = active.reduce((sum, l) => sum + (l.totalDue - l.amountRepaid), 0);
    const availableCredit = Math.max(0, memoryStore.trustScore.maxCreditLine - currentBorrowed);
    const repaymentProgress = 76;

    return {
      availableCredit,
      currentBorrowed,
      repaymentProgress,
      activeLoans: active,
      historicalLoans: repaid,
    };
  },

  async createLoan(input: CreateLoanRequest): Promise<LoanDto> {
    try {
      const u = await prisma.user.findFirst();
      if (u) {
        const totalDue = Number((input.principalAmount * (1 + (4.8 / 100) * (input.durationDays / 365))).toFixed(2));
        const created = await prisma.loan.create({
          data: {
            borrowerId: u.id,
            principalAmount: input.principalAmount,
            borrowedAsset: 'USDC',
            interestRateApr: 4.8,
            durationDays: input.durationDays,
            collateralRatio: (input.collateralAmount || 0) > 0 ? 15.0 : 0.0,
            collateralAmount: input.collateralAmount || 0.0,
            collateralAsset: 'USDC',
            status: 'ACTIVE',
            purpose: input.purpose,
            totalDue,
            dueDate: new Date(Date.now() + input.durationDays * 24 * 3600 * 1000),
          },
        });
        return {
          id: created.id,
          principalAmount: created.principalAmount,
          borrowedAsset: created.borrowedAsset,
          interestRateApr: created.interestRateApr,
          durationDays: created.durationDays,
          collateralRatio: created.collateralRatio,
          collateralAmount: created.collateralAmount,
          collateralAsset: created.collateralAsset || undefined,
          status: 'ACTIVE',
          purpose: created.purpose,
          amountRepaid: created.amountRepaid,
          totalDue: created.totalDue,
          dueDate: created.dueDate.toISOString().split('T')[0],
          createdAt: created.createdAt.toISOString().split('T')[0],
        };
      }
    } catch {
      // Fallback
    }

    const totalDue = Number((input.principalAmount * (1 + (4.8 / 100) * (input.durationDays / 365))).toFixed(2));
    const newLoan: LoanDto = {
      id: `LN-${Math.floor(1000 + Math.random() * 9000)}`,
      principalAmount: input.principalAmount,
      borrowedAsset: 'USDC',
      interestRateApr: 4.8,
      durationDays: input.durationDays,
      collateralRatio: (input.collateralAmount || 0) > 0 ? 15.0 : 0.0,
      collateralAmount: input.collateralAmount || 0.0,
      collateralAsset: 'USDC',
      status: 'ACTIVE',
      purpose: input.purpose,
      amountRepaid: 0.0,
      totalDue,
      dueDate: new Date(Date.now() + input.durationDays * 24 * 3600 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };

    memoryStore.loans.unshift(newLoan);
    return newLoan;
  },

  async repayLoan(loanId: string, amount: number): Promise<LoanDto> {
    try {
      const loan = await prisma.loan.findUnique({ where: { id: loanId } });
      if (loan) {
        const newRepaid = loan.amountRepaid + amount;
        const newStatus = newRepaid >= loan.totalDue ? 'REPAID' : 'ACTIVE';
        const updated = await prisma.loan.update({
          where: { id: loanId },
          data: {
            amountRepaid: newRepaid,
            status: newStatus,
            repayments: {
              create: {
                userId: loan.borrowerId,
                amount,
                asset: 'USDC',
              },
            },
          },
        });
        return {
          id: updated.id,
          principalAmount: updated.principalAmount,
          borrowedAsset: updated.borrowedAsset,
          interestRateApr: updated.interestRateApr,
          durationDays: updated.durationDays,
          collateralRatio: updated.collateralRatio,
          collateralAmount: updated.collateralAmount,
          collateralAsset: updated.collateralAsset || undefined,
          status: updated.status as 'ACTIVE' | 'REPAID',
          purpose: updated.purpose,
          amountRepaid: updated.amountRepaid,
          totalDue: updated.totalDue,
          dueDate: updated.dueDate.toISOString().split('T')[0],
          createdAt: updated.createdAt.toISOString().split('T')[0],
        };
      }
    } catch {
      // Fallback
    }

    const loan = memoryStore.loans.find((l) => l.id === loanId);
    if (!loan) {
      throw new Error(`Loan ${loanId} not found`);
    }

    loan.amountRepaid += amount;
    if (loan.amountRepaid >= loan.totalDue) {
      loan.status = 'REPAID';
    }

    // Boost trust score on repayment
    memoryStore.trustScore.score = Math.min(1000, memoryStore.trustScore.score + 6);
    memoryStore.trustScore.paymentReliability = Math.min(100, memoryStore.trustScore.paymentReliability + 1);

    return loan;
  },

  async getTransactions(params?: { category?: string; status?: string; asset?: string }) {
    try {
      const dbTx = await prisma.transaction.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbTx && dbTx.length > 0) {
        let list = dbTx.map((t) => ({
          id: t.id,
          type: t.type,
          title: t.title,
          asset: t.asset,
          amount: t.amount,
          valueUsd: t.valueUsd,
          status: t.status,
          date: t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          txHash: t.txHash,
          network: t.network,
          gasFee: t.gasFeeUsd,
          category: t.type === 'LOAN_REPAYMENT' || t.type === 'LOAN_ORIGINATION' ? 'Lending' : t.type === 'USDC_TRANSFER' ? 'Transfers' : 'DeFi',
        }));
        if (params?.category && params.category !== 'All') list = list.filter((t) => t.category === params.category);
        if (params?.asset && params.asset !== 'All') list = list.filter((t) => t.asset.includes(params.asset!));
        if (params?.status && params.status !== 'All') list = list.filter((t) => t.status === params.status);
        return list;
      }
    } catch {
      // Fallback
    }

    let list = [...memoryStore.transactions];
    if (params?.category && params.category !== 'All') {
      list = list.filter((t) => t.category === params.category);
    }
    if (params?.asset && params.asset !== 'All') {
      list = list.filter((t) => t.asset.includes(params.asset!));
    }
    if (params?.status && params.status !== 'All') {
      list = list.filter((t) => t.status === params.status);
    }
    return list;
  },
};
