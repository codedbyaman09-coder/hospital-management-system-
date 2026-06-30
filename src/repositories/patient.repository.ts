import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class PatientRepository {
  async findAll() {
    return prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.PatientCreateInput) {
    return prisma.patient.create({ data });
  }
}
