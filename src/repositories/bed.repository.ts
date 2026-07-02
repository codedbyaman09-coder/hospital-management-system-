import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class BedRepository {
  async findAll() {
    return prisma.bed.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.BedCreateInput) {
    return prisma.bed.create({ data });
  }

  async update(id: number, data: Prisma.BedUpdateInput) {
    return prisma.bed.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.bed.delete({
      where: { id },
    });
  }
}
