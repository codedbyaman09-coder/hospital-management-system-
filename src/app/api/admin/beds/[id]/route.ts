export const dynamic = 'force-dynamic';
import { bedController } from '@/controllers/bed.controller';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return bedController.updateBed(req as any, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return bedController.deleteBed(req as any, context);
}
