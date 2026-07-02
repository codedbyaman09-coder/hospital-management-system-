export const dynamic = 'force-dynamic';
import { bedController } from '@/controllers/bed.controller';
import { NextRequest } from 'next/server';

export async function GET() {
  return bedController.getBeds();
}

export async function POST(req: NextRequest) {
  return bedController.createBed(req as any);
}
