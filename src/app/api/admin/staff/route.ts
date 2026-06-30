export const dynamic = 'force-dynamic';
import { staffController } from '@/controllers/staff.controller';

export async function GET() {
  return staffController.getStaffs();
}

export async function POST(req: Request) {
  return staffController.createStaff(req);
}
