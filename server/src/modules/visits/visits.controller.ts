import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateVisitDto, UpdateVisitDto } from './dto';
import { VisitsService } from './visits.service';

@UseGuards(JwtAuthGuard)
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @Post()
  create(@Body() body: CreateVisitDto) {
    return this.visitsService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const visit = await this.visitsService.findOne(id);
    if (!visit) {
      throw new NotFoundException('Visit not found');
    }
    return visit;
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVisitDto) {
    return this.visitsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitsService.remove(id);
  }
}
