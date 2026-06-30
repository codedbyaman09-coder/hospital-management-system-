export const dynamic = 'force-dynamic';
import { patientController } from '@/controllers/patient.controller';

export async function GET() {
  return patientController.getPatients();
}

export async function POST(req: Request) {
  return patientController.createPatient(req);
}
