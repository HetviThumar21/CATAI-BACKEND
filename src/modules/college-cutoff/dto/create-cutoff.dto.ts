import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCutoffDto {
  @IsString()
  collegeId!: string;

  @IsString()
  exam!: string;

  @IsInt()
  year!: number;

  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  academicBackground?: string;

  @IsNumber()
  overallPercentile!: number;

  @IsOptional()
  @IsNumber()
  varcCutoff?: number;

  @IsOptional()
  @IsNumber()
  dilrCutoff?: number;

  @IsOptional()
  @IsNumber()
  qaCutoff?: number;
}