import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function connectDB() {
  try {
    // Prisma connects lazily, but we can force a connection test:
    await prisma.$connect();
    console.log('MongoDB connection logic replaced with Prisma MySQL');
  } catch (error) {
    console.error('Prisma connection error:', error);
  }
}
