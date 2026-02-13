import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const [totalPatients, upcomingVisitsToday, revenueAggregate] = await Promise.all([
      this.prisma.patient.count(),
      this.prisma.visit.count({
        where: { visitDate: { gte: now, lte: end } },
      }),
      this.prisma.visit.aggregate({
        _sum: { cost: true },
        where: { visitDate: { gte: start, lte: end } },
      }),
    ]);

    return {
      totalPatients,
      upcomingVisitsToday,
      revenueToday: Number(revenueAggregate._sum.cost || 0),
    };
  }
}
