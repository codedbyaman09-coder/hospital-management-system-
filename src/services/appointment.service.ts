import { AppointmentRepository } from '../repositories/appointment.repository';
import { Prisma } from '@prisma/client';

export class AppointmentService {
  private repository: AppointmentRepository;

  constructor() {
    this.repository = new AppointmentRepository();
  }

  async getAllAppointments() {
    return this.repository.findAll();
  }

  async createAppointment(data: Prisma.AppointmentCreateInput) {
    return this.repository.create(data);
  }
}
