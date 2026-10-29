import { NextRequest } from 'next/server';
import { dbService } from '@/lib/db/repo';
import { jsonOk, handleApiError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const asset = searchParams.get('asset') || undefined;

    const transactions = await dbService.getTransactions({ category, status, asset });
    return jsonOk(transactions);
  } catch (error) {
    return handleApiError(error);
  }
}
