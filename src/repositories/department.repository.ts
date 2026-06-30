import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class DepartmentRepository {
  async findAll() {
    return prisma.department.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.DepartmentCreateInput) {
    return prisma.department.create({ data });
  }
}
