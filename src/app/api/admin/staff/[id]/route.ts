export const dynamic = 'force-dynamic';
import { staffController } from '@/controllers/staff.controller';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return staffController.updateStaff(req as any, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return staffController.deleteStaff(req as any, context);
}
