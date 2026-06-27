import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Appointment from '@/models/Appointment';

export async function GET() {
  try {
    await connectToDatabase();
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: appointments });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const appointment = await Appointment.create(body);
    return NextResponse.json({ success: true, data: appointment });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
