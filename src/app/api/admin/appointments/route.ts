export const dynamic = 'force-dynamic';
import { appointmentController } from '@/controllers/appointment.controller';

export async function GET() {
  return appointmentController.getAppointments();
}

export async function POST(req: Request) {
  return appointmentController.createAppointment(req);
}
