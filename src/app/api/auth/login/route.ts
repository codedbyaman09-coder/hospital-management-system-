export const dynamic = 'force-dynamic';
import { authController } from '@/controllers/auth.controller';

export async function POST(req: Request) {
  return authController.login(req);
}
