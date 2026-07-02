import { BedRepository } from '../repositories/bed.repository';
import { Prisma } from '@prisma/client';

export class BedService {
  private repository: BedRepository;

  constructor() {
    this.repository = new BedRepository();
  }

  async getAllBeds() {
    return this.repository.findAll();
  }

  async createBed(data: Prisma.BedCreateInput) {
    return this.repository.create(data);
  }

  async updateBed(id: number, data: Prisma.BedUpdateInput) {
    return this.repository.update(id, data);
  }

  async deleteBed(id: number) {
    return this.repository.delete(id);
  }
}
