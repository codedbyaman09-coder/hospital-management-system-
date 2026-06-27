import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Patient from '@/models/Patient';

export async function GET() {
  try {
    await connectToDatabase();
    const patients = await Patient.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: patients });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const patient = await Patient.create(body);
    return NextResponse.json({ success: true, data: patient });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
