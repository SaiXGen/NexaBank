import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding NexaFi database...');

  // Create demo user
  const user = await prisma.user.upsert({
    where: { id: 'usr-demo-001' },
    update: {},
    create: {
      id: 'usr-demo-001',
      username: 'alexvance',
      email: 'alex@nexafi.io',
      ensName: 'alex.nexafi.eth',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  // Create primary wallet
  await prisma.wallet.upsert({
    where: { address: '0x71C83e58b142828bF93F2' },
    update: {},
    create: {
      address: '0x71C83e58b142828bF93F2',
      network: 'Ethereum',
      isPrimary: true,
      userId: user.id,
    },
  });

  // Create Assets
  const assets = [
    { symbol: 'USDC', name: 'USD Coin', balance: 12400.0, priceUsd: 1.0, valueUsd: 12400.0, change24h: 0.02, icon: '💵', allocationPct: 49.9 },
    { symbol: 'BTC', name: 'Bitcoin (Wrapped)', balance: 0.1257, priceUsd: 65000.0, valueUsd: 8170.0, change24h: 2.45, icon: '₿', allocationPct: 32.9 },
    { symbol: 'ETH', name: 'Ethereum', balance: 1.223, priceUsd: 3500.0, valueUsd: 4280.4, change24h: 3.12, icon: '⟠', allocationPct: 17.2 },
  ];

  for (const asset of assets) {
    await prisma.asset.create({
      data: {
        ...asset,
        userId: user.id,
      },
    });
  }

  // Create Trust Score
  await prisma.trustScore.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      score: 842,
      ratingTier: 'Excellent',
      paymentReliability: 92,
      walletActivity: 84,
      financialConsistency: 88,
      circleReputation: 79,
      assetStability: 86,
      maxCreditLine: 8500.0,
    },
  });

  // Create Trust Circle
  const circle = await prisma.trustCircle.create({
    data: {
      id: 'circle-tech-builders',
      name: 'Tech Builders Circle',
      description: 'Curated peer-lending cohort of verified Web3 software engineers and founders with shared mutual stake.',
      category: 'Developers & Founders',
      circleTrustScore: 91,
      totalCapitalPooled: 120000.0,
      activeLoansCount: 7,
      historicalRepaymentPct: 98.2,
      members: {
        create: {
          userId: user.id,
          role: 'Member',
          stakedContribution: 5000.0,
        },
      },
    },
  });

  // Create Active Loan
  await prisma.loan.create({
    data: {
      id: 'LN-8402',
      borrowerId: user.id,
      circleId: circle.id,
      principalAmount: 2000.0,
      borrowedAsset: 'USDC',
      interestRateApr: 4.8,
      durationDays: 90,
      collateralRatio: 15.0,
      collateralAmount: 300.0,
      collateralAsset: 'USDC',
      status: 'ACTIVE',
      purpose: 'Node validator expansion',
      amountRepaid: 1520.0,
      totalDue: 2024.0,
      dueDate: new Date(Date.now() + 60 * 24 * 3600 * 1000),
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
