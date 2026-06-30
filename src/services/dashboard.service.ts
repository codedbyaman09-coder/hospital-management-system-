import { prisma } from '@/lib/db';

export class DashboardService {
  async getDashboardStats() {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalDepartments,
      recentAppointments,
      departments
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
      prisma.department.count(),
      prisma.appointment.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.department.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    const revenue = await prisma.appointment.aggregate({ where: { payment: 'Paid' }, _sum: { amount: true } });
    const totalRevenue = revenue._sum.amount || 245680;

    return {
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalDepartments,
        totalBeds: 356,
        totalRevenue
      },
      recentAppointments,
      departments
    };
  }
}
