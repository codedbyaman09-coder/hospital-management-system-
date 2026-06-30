import { DashboardService } from '../services/dashboard.service';
import { NextResponse } from 'next/server';

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  async getDashboardData() {
    try {
      const data = await this.service.getDashboardStats();
      return NextResponse.json({ success: true, data });
    } catch (error: unknown) {
      console.error('Dashboard API Error:', error);
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const dashboardController = new DashboardController();
