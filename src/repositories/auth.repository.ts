import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return prisma.user.update({ where: { id }, data: { refreshToken } });
  }
}
