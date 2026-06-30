import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class AppointmentRepository {
  async findAll() {
    return prisma.appointment.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.AppointmentCreateInput) {
    return prisma.appointment.create({ data });
  }
}
