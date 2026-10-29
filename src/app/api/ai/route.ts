import { NextRequest } from 'next/server';
import { jsonOk, handleApiError } from '@/lib/api-response';
import { aiChatSchema } from '@/lib/validations';
import { dbService } from '@/lib/db/repo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = aiChatSchema.parse(body);

    const lower = message.toLowerCase();
    const trustScore = await dbService.getTrustScore();
    const loans = await dbService.getLoansOverview();
    const wallet = await dbService.getWallet();

    let responseText = '';
    let metrics: { label: string; value: string }[] | undefined;
    let suggestedActions: string[] | undefined;

    if (lower.includes('what changed') || lower.includes('portfolio')) {
      responseText = `Your total portfolio gained **+2.84% (+$680.40)** this week, bringing your total net worth to **$${wallet.totalBalanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}**. The primary driver was appreciation in Ethereum and steady yield distributions from your USDC liquidity reserves.`;
      metrics = [
        { label: 'Net Balance', value: `$${wallet.totalBalanceUsd.toLocaleString()}` },
        { label: '7D Change', value: '+2.84%' },
        { label: 'Stablecoin Reserve', value: '49.9%' },
      ];
      suggestedActions = ['View asset breakdown', 'Review yield opportunities', 'Check transaction log'];
    } else if (lower.includes('trust score') || lower.includes('why did my score')) {
      responseText = `Your **Nexa Trust Score** is currently **${trustScore.score} / 1000 (${trustScore.ratingTier})**. It increased recently by **+18 points** following your on-time repayment of $500 USDC on Loan #LN-8402, and **+8 points** for your ongoing stake in the Tech Builders Circle. Zero liquidation events across 620+ days of wallet history keep your Payment Reliability at an optimal ${trustScore.paymentReliability}%.`;
      metrics = [
        { label: 'Trust Score', value: `${trustScore.score} / 1000` },
        { label: 'Tier', value: trustScore.ratingTier },
        { label: 'Payment Reliability', value: `${trustScore.paymentReliability}%` },
      ];
      suggestedActions = ['Explore Trust Circles', 'View credit eligibility', 'See score breakdown'];
    } else if (lower.includes('credit') || lower.includes('eligible') || lower.includes('borrow')) {
      responseText = `Based on your **${trustScore.score} Trust Score**, you are eligible for **$${loans.availableCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}** in uncollateralized or low-collateral credit at a base rate of **4.8% APR**. You currently have active borrowing of **$${loans.currentBorrowed.toLocaleString()}** with ${loans.repaymentProgress}% repayment progress.`;
      metrics = [
        { label: 'Available Credit', value: `$${loans.availableCredit.toLocaleString()}` },
        { label: 'Active Borrowed', value: `$${loans.currentBorrowed.toLocaleString()}` },
        { label: 'Base APR', value: '4.8%' },
      ];
      suggestedActions = ['Request new loan', 'Repay active loan', 'Calculate APR'];
    } else {
      responseText = `I analyzed your request regarding "${message}". Your NexaFi financial account is in strong standing with **$${wallet.totalBalanceUsd.toLocaleString()}** net balance, **${trustScore.score} Trust Score**, and **$${loans.availableCredit.toLocaleString()}** available decentralized credit line. How else can I assist with your on-chain portfolio or trust profile today?`;
      suggestedActions = [
        'What changed in my portfolio this week?',
        'Why did my Trust Score change?',
        'How much credit am I currently eligible for?',
      ];
    }

    return jsonOk({
      id: `ai-${Date.now()}`,
      sender: 'assistant' as const,
      content: responseText,
      metrics,
      suggestedActions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
