export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma, connectDB } from '@/lib/db';

export async function POST() {
  try {
    await connectDB();

    // Clear existing data for a fresh seed
    await prisma.patient.deleteMany({});
    await prisma.doctor.deleteMany({});
    await prisma.appointment.deleteMany({});
    await prisma.department.deleteMany({});
    await prisma.user.deleteMany({});

    // 0. Seed Admin User
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('Password@123', 10);
    await prisma.user.create({
      data: {
        fullName: 'Admin User',
        email: 'admin@citycare.com',
        password: hashedPassword,
        role: 'Admin',
        isVerified: true
      }
    });

    // 1. Seed Departments
    const depts = [
      { name: 'Cardiology', head: 'Dr. Sarah Khan', iconName: 'Heart', color: 'text-red-500', bg: 'bg-red-50', staff: 24, activePatients: 145, status: 'Active' },
      { name: 'Neurology', head: 'Dr. Usman Ali', iconName: 'Brain', color: 'text-purple-500', bg: 'bg-purple-50', staff: 18, activePatients: 98, status: 'Active' },
      { name: 'Orthopedics', head: 'Dr. Maria Ahmed', iconName: 'Bone', color: 'text-blue-500', bg: 'bg-blue-50', staff: 20, activePatients: 112, status: 'Active' },
      { name: 'Dermatology', head: 'Dr. Hamza Qureshi', iconName: 'Activity', color: 'text-teal-500', bg: 'bg-teal-50', staff: 12, activePatients: 65, status: 'Active' }
    ];
    await prisma.department.createMany({ data: depts });

    // 2. Seed Doctors
    const doctors = [
      { name: 'Dr. Sarah Khan', email: 'sarah@citycare.com', phone: '+92 300 1234567', avatar: 'https://i.pravatar.cc/150?u=11', dept: 'Cardiology', qual: 'MBBS, FCPS', experience: 10, status: 'Active' },
      { name: 'Dr. Usman Ali', email: 'usman@citycare.com', phone: '+92 301 2345678', avatar: 'https://i.pravatar.cc/150?u=12', dept: 'Neurology', qual: 'MBBS, MD', experience: 8, status: 'Active' },
      { name: 'Dr. Maria Ahmed', email: 'maria@citycare.com', phone: '+92 302 3456789', avatar: 'https://i.pravatar.cc/150?u=13', dept: 'Orthopedics', qual: 'MBBS, MS', experience: 12, status: 'Active' },
      { name: 'Dr. Hamza Qureshi', email: 'hamza@citycare.com', phone: '+92 303 4567890', avatar: 'https://i.pravatar.cc/150?u=14', dept: 'Dermatology', qual: 'MBBS, MD', experience: 5, status: 'On Leave' },
    ];
    await prisma.doctor.createMany({ data: doctors });

    // 3. Seed Patients
    const patients = [
      { name: 'Ali Raza', email: 'ali@example.com', phone: '+92 310 1122334', avatar: 'https://i.pravatar.cc/150?u=21', gender: 'Male', age: 45, bloodGroup: 'O+', lastVisit: 'May 20, 2024', status: 'Active' },
      { name: 'Fatima Noor', email: 'fatima@example.com', phone: '+92 311 2233445', avatar: 'https://i.pravatar.cc/150?u=22', gender: 'Female', age: 32, bloodGroup: 'A+', lastVisit: 'May 21, 2024', status: 'Active' },
      { name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+92 312 3344556', avatar: 'https://i.pravatar.cc/150?u=23', gender: 'Male', age: 28, bloodGroup: 'B-', lastVisit: 'May 22, 2024', status: 'Critical' },
      { name: 'Ayesha Malik', email: 'ayesha@example.com', phone: '+92 313 4455667', avatar: 'https://i.pravatar.cc/150?u=24', gender: 'Female', age: 50, bloodGroup: 'AB+', lastVisit: 'May 23, 2024', status: 'Inactive' },
      { name: 'Bilal Tariq', email: 'bilal@example.com', phone: '+92 314 5566778', avatar: 'https://i.pravatar.cc/150?u=25', gender: 'Male', age: 38, bloodGroup: 'O-', lastVisit: 'May 24, 2024', status: 'Active' },
    ];
    await prisma.patient.createMany({ data: patients });

    // 4. Seed Appointments
    const appointments = [
      { patientName: 'Ali Raza', phone: '+92 310 1122334', pAvatar: 'https://i.pravatar.cc/150?u=21', doctorName: 'Dr. Sarah Khan', docQual: 'MBBS, FCPS', dAvatar: 'https://i.pravatar.cc/150?u=11', dept: 'Cardiology', date: 'May 25, 2024', time: '10:00 AM', status: 'Completed', payment: 'Paid', amount: 2000 },
      { patientName: 'Fatima Noor', phone: '+92 311 2233445', pAvatar: 'https://i.pravatar.cc/150?u=22', doctorName: 'Dr. Usman Ali', docQual: 'MBBS, MD', dAvatar: 'https://i.pravatar.cc/150?u=12', dept: 'Neurology', date: 'May 26, 2024', time: '11:30 AM', status: 'Confirmed', payment: 'Unpaid', amount: 3000 },
      { patientName: 'Ahmed Hassan', phone: '+92 312 3344556', pAvatar: 'https://i.pravatar.cc/150?u=23', doctorName: 'Dr. Maria Ahmed', docQual: 'MBBS, MS', dAvatar: 'https://i.pravatar.cc/150?u=13', dept: 'Orthopedics', date: 'May 26, 2024', time: '02:00 PM', status: 'Pending', payment: 'Unpaid', amount: 2500 },
      { patientName: 'Ayesha Malik', phone: '+92 313 4455667', pAvatar: 'https://i.pravatar.cc/150?u=24', doctorName: 'Dr. Hamza Qureshi', docQual: 'MBBS, MD', dAvatar: 'https://i.pravatar.cc/150?u=14', dept: 'Dermatology', date: 'May 27, 2024', time: '09:00 AM', status: 'Cancelled', payment: 'Refunded', amount: 1500 },
      { patientName: 'Bilal Tariq', phone: '+92 314 5566778', pAvatar: 'https://i.pravatar.cc/150?u=25', doctorName: 'Dr. Sarah Khan', docQual: 'MBBS, FCPS', dAvatar: 'https://i.pravatar.cc/150?u=11', dept: 'Cardiology', date: 'May 27, 2024', time: '03:30 PM', status: 'Confirmed', payment: 'Paid', amount: 2000 },
    ];
    await prisma.appointment.createMany({ data: appointments });

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });

  } catch (error: unknown) {
    console.error('Seed API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
