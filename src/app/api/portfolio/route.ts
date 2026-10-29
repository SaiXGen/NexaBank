import { NextResponse } from 'next/server';
import { TOTAL_PORTFOLIO_VALUE, PORTFOLIO_24H_CHANGE, INITIAL_TOKENS, PORTFOLIO_HISTORY } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get('timeframe') as '7D' | '30D' | '90D' | '1Y') || '30D';

  const history = PORTFOLIO_HISTORY[timeframe] || PORTFOLIO_HISTORY['30D'];

  return NextResponse.json({
    success: true,
    data: {
      totalValue: TOTAL_PORTFOLIO_VALUE,
      change24h: PORTFOLIO_24H_CHANGE,
      timeframe,
      tokens: INITIAL_TOKENS,
      chartData: history,
    },
  });
}
