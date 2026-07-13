import { BedService } from '../services/bed.service';
import { NextResponse } from 'next/server';

export class BedController {
  private service: BedService;

  constructor() {
    this.service = new BedService();
  }

  async getBeds() {
    try {
      const records = await this.service.getAllBeds();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async createBed(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.createBed(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async updateBed(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id, 10);
      if (isNaN(id)) {
        return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
      }
      const body = await req.json();
      const record = await this.service.updateBed(id, body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async deleteBed(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id, 10);
      if (isNaN(id)) {
        return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
      }
      await this.service.deleteBed(id);
      return NextResponse.json({ success: true, data: { id } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const bedController = new BedController();
