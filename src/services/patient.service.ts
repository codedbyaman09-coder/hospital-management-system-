import { PatientRepository } from '../repositories/patient.repository';
import { Prisma } from '@prisma/client';

export class PatientService {
  private repository: PatientRepository;

  constructor() {
    this.repository = new PatientRepository();
  }

  async getAllPatients() {
    return this.repository.findAll();
  }

  async createPatient(data: Prisma.PatientCreateInput) {
    return this.repository.create(data);
  }
}
