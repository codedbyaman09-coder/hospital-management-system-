import { DoctorService } from '../services/doctor.service';
import { NextResponse } from 'next/server';

export class DoctorController {
  private service: DoctorService;

  constructor() {
    this.service = new DoctorService();
  }

  async getDoctors() {
    try {
      const records = await this.service.getAllDoctors();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async createDoctor(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.createDoctor(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const doctorController = new DoctorController();
