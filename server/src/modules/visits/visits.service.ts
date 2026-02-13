import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateVisitDto, UpdateVisitDto } from './dto';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.visit.findMany({ include: { patient: true }, orderBy: { visitDate: 'asc' } });
  }

  findOne(id: number) {
    return this.prisma.visit.findUnique({ where: { id }, include: { patient: true } });
  }

  create(data: CreateVisitDto) {
    return this.prisma.visit.create({
      data: {
        ...data,
        visitDate: new Date(data.visitDate),
      },
      include: { patient: true },
    });
  }

  async update(id: number, data: UpdateVisitDto) {
    await this.ensureExists(id);
    return this.prisma.visit.update({
      where: { id },
      data: {
        ...data,
        visitDate: data.visitDate ? new Date(data.visitDate) : undefined,
      },
      include: { patient: true },
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    await this.prisma.visit.delete({ where: { id } });
    return { message: 'Visit deleted' };
  }

  private async ensureExists(id: number) {
    const visit = await this.prisma.visit.findUnique({ where: { id } });
    if (!visit) {
      throw new NotFoundException('Visit not found');
    }
    return visit;
  }
}
