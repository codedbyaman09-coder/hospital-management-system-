import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class StaffRepository {
  async findAll() {
    return prisma.staff.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.StaffCreateInput) {
    return prisma.staff.create({ data });
  }

  async update(id: number, data: Prisma.StaffUpdateInput) {
    return prisma.staff.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.staff.delete({
      where: { id },
    });
  }
}
