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
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { PatientsService } from './patients.service';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Post()
  create(@Body() body: CreatePatientDto) {
    return this.patientsService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePatientDto) {
    return this.patientsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }
}
