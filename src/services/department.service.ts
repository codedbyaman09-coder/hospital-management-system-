import { DepartmentRepository } from '../repositories/department.repository';
import { Prisma } from '@prisma/client';

export class DepartmentService {
  private repository: DepartmentRepository;

  constructor() {
    this.repository = new DepartmentRepository();
  }

  async getAllDepartments() {
    return this.repository.findAll();
  }

  async createDepartment(data: Prisma.DepartmentCreateInput) {
    return this.repository.create(data);
  }
}
