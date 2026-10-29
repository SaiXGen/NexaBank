import { NextRequest } from 'next/server';
import { dbService } from '@/lib/db/repo';
import { jsonOk, jsonCreated, handleApiError } from '@/lib/api-response';
import { createTrustCircleSchema } from '@/lib/validations';

export async function GET() {
  try {
    const circles = await dbService.getTrustCircles();
    return jsonOk(circles);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createTrustCircleSchema.parse(body);

    const circle = await dbService.createTrustCircle(validated);
    return jsonCreated(circle);
  } catch (error) {
    return handleApiError(error);
  }
}
