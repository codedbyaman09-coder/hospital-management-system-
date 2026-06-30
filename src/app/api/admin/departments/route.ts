export const dynamic = 'force-dynamic';
import { departmentController } from '@/controllers/department.controller';

export async function GET() {
  return departmentController.getDepartments();
}

export async function POST(req: Request) {
  return departmentController.createDepartment(req);
}
