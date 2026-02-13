import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateVisitDto {
  @Type(() => Number)
  @IsInt()
  patientId!: number;

  @IsDateString()
  visitDate!: string;

  @IsString()
  treatment!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cost!: number;

  @IsString()
  status!: string;
}

export class UpdateVisitDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  patientId?: number;

  @IsOptional()
  @IsDateString()
  visitDate?: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
