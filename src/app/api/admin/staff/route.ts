import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Staff from '@/models/Staff';

export async function GET() {
  try {
    await connectToDatabase();
    const staff = await Staff.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: staff });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const staff = await Staff.create(body);
    return NextResponse.json({ success: true, data: staff });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
