import { StaffRepository } from '../repositories/staff.repository';
import { Prisma } from '@prisma/client';

export class StaffService {
  private repository: StaffRepository;

  constructor() {
    this.repository = new StaffRepository();
  }

  async getAllStaffs() {
    return this.repository.findAll();
  }

  async createStaff(data: Prisma.StaffCreateInput) {
    return this.repository.create(data);
  }

  async updateStaff(id: number, data: Prisma.StaffUpdateInput) {
    return this.repository.update(id, data);
  }

  async deleteStaff(id: number) {
    return this.repository.delete(id);
  }
}
