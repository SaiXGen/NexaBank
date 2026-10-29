import { dbService } from '@/lib/db/repo';
import { jsonOk, handleApiError } from '@/lib/api-response';

export async function GET() {
  try {
    const user = await dbService.getUser();
    return jsonOk(user);
  } catch (error) {
    return handleApiError(error);
  }
}
