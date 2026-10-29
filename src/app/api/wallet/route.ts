import { dbService } from '@/lib/db/repo';
import { jsonOk, handleApiError } from '@/lib/api-response';

export async function GET() {
  try {
    const wallet = await dbService.getWallet();
    return jsonOk(wallet);
  } catch (error) {
    return handleApiError(error);
  }
}
