import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Patient from '@/models/Patient';
import Doctor from '@/models/Doctor';
import Appointment from '@/models/Appointment';
import Department from '@/models/Department';

export async function GET() {
  try {
    await connectToDatabase();

    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalDepartments,
      recentAppointments,
      departments
    ] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Department.countDocuments(),
      Appointment.find().sort({ createdAt: -1 }).limit(5),
      Department.find().sort({ createdAt: -1 })
    ]);

    // Calculate total revenue from completed/paid appointments if needed, currently mocked
    const revenue = await Appointment.aggregate([
      { $match: { payment: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalPatients,
          totalDoctors,
          totalAppointments,
          totalDepartments,
          totalBeds: 356, // Still mock for now since we haven't created a Bed model
          totalRevenue: totalRevenue || 245680 // fallback to mock if 0 for UI purposes
        },
        recentAppointments,
        departments
      }
    });

  } catch (error: unknown) {
    console.error('Dashboard API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
