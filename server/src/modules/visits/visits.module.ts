import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService, PrismaService],
  exports: [VisitsService],
})
export class VisitsModule {}
