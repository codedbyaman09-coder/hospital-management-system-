import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Doctor from '@/models/Doctor';

export async function GET() {
  try {
    await connectToDatabase();
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: doctors });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const doc = await Doctor.create(body);
    return NextResponse.json({ success: true, data: doc });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
