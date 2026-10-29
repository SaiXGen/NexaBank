import { NextRequest } from 'next/server';
import { dbService } from '@/lib/db/repo';
import { jsonOk, jsonCreated, jsonError, handleApiError } from '@/lib/api-response';
import { createLoanSchema } from '@/lib/validations';

export async function GET() {
  try {
    const overview = await dbService.getLoansOverview();
    return jsonOk(overview);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createLoanSchema.parse(body);

    const overview = await dbService.getLoansOverview();
    if (validated.principalAmount > overview.availableCredit) {
      return jsonError(
        `Requested loan ($${validated.principalAmount} USDC) exceeds your pre-approved limit of $${overview.availableCredit} USDC.`,
        'CREDIT_LIMIT_EXCEEDED',
        400
      );
    }

    const loan = await dbService.createLoan(validated);
    return jsonCreated(loan);
  } catch (error) {
    return handleApiError(error);
  }
}
