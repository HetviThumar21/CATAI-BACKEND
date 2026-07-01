import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTopicPerformanceDto {
  @IsString()
  mockTestId!: string;

  @IsString()
  section!: string;

  @IsString()
  topic!: string;

  @IsInt()
  questionsAttempted!: number;

  @IsInt()
  correct!: number;

  @IsInt()
  wrong!: number;

  @IsNumber()
  accuracy!: number;

  @IsOptional()
  @IsNumber()
  percentile?: number;

  @IsOptional()
  @IsNumber()
  averageTime?: number;

  @IsOptional()
  @IsString()
  difficulty?: string;
}