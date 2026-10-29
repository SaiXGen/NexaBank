import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db/repo';
import { handleApiError } from '@/lib/api-response';

export async function GET() {
  try {
    const scoreData = await dbService.getTrustScore();

    // Returns exact format requested by user
    return NextResponse.json({
      score: scoreData.score,
      paymentReliability: scoreData.paymentReliability,
      walletActivity: scoreData.walletActivity,
      financialConsistency: scoreData.financialConsistency,
      circleReputation: scoreData.circleReputation,
      assetStability: scoreData.assetStability,
      ratingTier: scoreData.ratingTier,
      maxCreditLine: scoreData.maxCreditLine,
      updatedAt: scoreData.updatedAt,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
