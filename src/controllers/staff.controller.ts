import { StaffService } from '../services/staff.service';
import { NextResponse } from 'next/server';

export class StaffController {
  private service: StaffService;

  constructor() {
    this.service = new StaffService();
  }

  async getStaffs() {
    try {
      const records = await this.service.getAllStaffs();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async createStaff(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.createStaff(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const staffController = new StaffController();
