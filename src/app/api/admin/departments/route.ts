import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Department from '@/models/Department';

export async function GET() {
  try {
    await connectToDatabase();
    const departments = await Department.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: departments });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const dept = await Department.create(body);
    return NextResponse.json({ success: true, data: dept });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
