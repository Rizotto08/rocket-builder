import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  async create(data: CreatePatientDto) {
    return this.prisma.patient.create({ data });
  }

  async update(id: number, data: UpdatePatientDto) {
    await this.ensureExists(id);
    return this.prisma.patient.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    await this.prisma.patient.delete({ where: { id } });
    return { message: 'Patient deleted' };
  }

  private async ensureExists(id: number) {
    const patient = await this.findOne(id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }
}
