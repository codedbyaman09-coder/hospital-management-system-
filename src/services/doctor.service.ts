import { DoctorRepository } from '../repositories/doctor.repository';
import { Prisma } from '@prisma/client';

export class DoctorService {
  private repository: DoctorRepository;

  constructor() {
    this.repository = new DoctorRepository();
  }

  async getAllDoctors() {
    return this.repository.findAll();
  }

  async createDoctor(data: Prisma.DoctorCreateInput) {
    return this.repository.create(data);
  }
}
