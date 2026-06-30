import { AppointmentService } from '../services/appointment.service';
import { NextResponse } from 'next/server';

export class AppointmentController {
  private service: AppointmentService;

  constructor() {
    this.service = new AppointmentService();
  }

  async getAppointments() {
    try {
      const records = await this.service.getAllAppointments();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async createAppointment(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.createAppointment(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const appointmentController = new AppointmentController();
