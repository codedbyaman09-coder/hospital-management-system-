import { PatientService } from '../services/patient.service';
import { NextResponse } from 'next/server';

export class PatientController {
  private service: PatientService;

  constructor() {
    this.service = new PatientService();
  }

  async getPatients() {
    try {
      const records = await this.service.getAllPatients();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async createPatient(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.createPatient(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const patientController = new PatientController();
