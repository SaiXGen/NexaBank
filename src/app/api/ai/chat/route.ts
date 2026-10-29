import { NextResponse } from 'next/server';

interface ChatRequest {
  message: string;
}
export async function POST(request: Request) {
  try {
    let message = '';
    try {
      const body = await request.json();
      message = body?.message || '';
    } catch {
      message = '';
    }

    const lower = (typeof message === 'string' ? message : '').toLowerCase();

    let responseText = '';
    let metrics: { label: string; value: string }[] | undefined;
    let suggestedActions: string[] | undefined;

    if (lower.includes('what changed') || lower.includes('portfolio')) {
      responseText =
        'Your total portfolio gained **+2.84% (+$680.40)** this week, bringing your net balance to **$24,850.40**. The primary driver was appreciation in Ethereum (+3.12%) and steady yield distributions from your USDC deposits in the Tech Builders Vault.';
      metrics = [
        { label: 'Net Balance', value: '$24,850.40' },
        { label: '7D Change', value: '+2.84%' },
        { label: 'Yield Earned', value: '+$84.00 USDC' },
      ];
      suggestedActions = ['View asset breakdown', 'Review yield opportunities', 'Check transaction log'];
    } else if (lower.includes('trust score') || lower.includes('why did my score')) {
      responseText =
        'Your **Nexa Trust Score** is currently **842 / 1000 (Tier: Excellent)**. It increased recently by **+18 points** following your on-time repayment of $500 USDC on Loan #LN-8402, and **+8 points** for your ongoing stake in the Tech Builders Circle. Zero liquidation events across 620+ days of wallet history keep your Payment Reliability at an optimal 92%.';
      metrics = [
        { label: 'Trust Score', value: '842 / 1000' },
        { label: 'Tier', value: 'Excellent' },
        { label: 'Payment Reliability', value: '92%' },
      ];
      suggestedActions = ['Explore Trust Circles', 'View credit eligibility', 'See score breakdown'];
    } else if (lower.includes('credit') || lower.includes('eligible') || lower.includes('borrow')) {
      responseText =
        'Based on your **842 Trust Score**, you are eligible for **$8,500.00** in uncollateralized or low-collateral credit at a base rate of **4.8% APR**. You currently have an active loan of **$2,000.00** with 76% repayment progress, leaving **$6,500.00** in instantaneous borrowing capacity without liquidating your crypto holdings.';
      metrics = [
        { label: 'Available Credit', value: '$8,500.00' },
        { label: 'Active Borrowed', value: '$2,000.00' },
        { label: 'Base APR', value: '4.8%' },
      ];
      suggestedActions = ['Request new loan', 'Repay active loan', 'Calculate APR'];
    } else if (lower.includes('transaction') || lower.includes('summarize')) {
      responseText =
        'Here is your recent on-chain activity summary for the past 7 days:\n\n1. **Loan Repayment**: $500.00 USDC submitted to Tech Builders Community Pool (Completed)\n2. **USDC Transfer**: -250.00 USDC sent to `elena.eth` on Base (Completed, gas fee $0.08)\n3. **Yield Deposit**: +$84.00 USDC from Nexa Yield Vault (Completed)\n4. **Token Swap**: 0.5 ETH swapped for 1,750 USDC on Uniswap v3 (Completed)';
      metrics = [
        { label: 'Total Volume', value: '$2,584.00' },
        { label: 'Transactions', value: '4 Completed' },
        { label: 'Avg Gas Fee', value: '$0.41' },
      ];
      suggestedActions = ['Open Transactions Ledger', 'Filter by Transfers', 'Export CSV Report'];
    } else if (lower.includes('spending') || lower.includes('categories')) {
      responseText =
        'Your spending and capital flow over the last 30 days is categorized as follows:\n\n• **Lending & Debt Service**: 45% ($1,500 USDC)\n• **Transfers & P2P**: 25% ($850 USDC)\n• **DeFi Liquidity & Staking**: 20% ($680 USDC)\n• **Network Gas & Fees**: <1% ($12.50 across L1/L2s)\n\nYour capital velocity is healthy, with 0% unclassified high-risk contract interactions.';
      metrics = [
        { label: 'Top Category', value: 'Lending (45%)' },
        { label: 'Gas Efficiency', value: '99.2%' },
        { label: 'Risk Score', value: 'Low' },
      ];
      suggestedActions = ['Review spending history', 'Download tax summary', 'Optimize gas usage'];
    } else {
      responseText = `I analyzed your request regarding "${message}". Your NexaFi financial account is in strong standing with **$24,850.40** net balance, **842 Trust Score**, and **$8,500.00** available decentralized credit line. How else can I assist with your on-chain portfolio or trust profile today?`;
      suggestedActions = [
        'What changed in my portfolio this week?',
        'Why did my Trust Score change?',
        'How much credit am I currently eligible for?',
      ];
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: responseText,
        metrics,
        suggestedActions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process AI query' },
      { status: 500 }
    );
  }
}
