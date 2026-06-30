import { DepartmentService } from '../services/department.service';
import { NextResponse } from 'next/server';

export class DepartmentController {
  private service: DepartmentService;

  constructor() {
    this.service = new DepartmentService();
  }

  async getDepartments() {
    try {
      const records = await this.service.getAllDepartments();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async createDepartment(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.createDepartment(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const departmentController = new DepartmentController();
