import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class StaffRepository {
  async findAll() {
    return prisma.staff.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.StaffCreateInput) {
    return prisma.staff.create({ data });
  }
}
