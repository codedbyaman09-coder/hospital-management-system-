import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class DoctorRepository {
  async findAll() {
    return prisma.doctor.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.DoctorCreateInput) {
    return prisma.doctor.create({ data });
  }
}
