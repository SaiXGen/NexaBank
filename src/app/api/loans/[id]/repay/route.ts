import { NextRequest } from 'next/server';
import { dbService } from '@/lib/db/repo';
import { jsonOk, handleApiError } from '@/lib/api-response';
import { repayLoanSchema } from '@/lib/validations';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = repayLoanSchema.parse(body);

    const updatedLoan = await dbService.repayLoan(id, validated.amount);
    return jsonOk(updatedLoan);
  } catch (error) {
    return handleApiError(error);
  }
}
