export const dynamic = 'force-dynamic';
import { doctorController } from '@/controllers/doctor.controller';

export async function GET() {
  return doctorController.getDoctors();
}

export async function POST(req: Request) {
  return doctorController.createDoctor(req);
}
