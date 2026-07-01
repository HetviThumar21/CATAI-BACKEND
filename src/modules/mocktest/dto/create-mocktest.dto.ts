import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateMockTestDto {
  @IsString()
  exam!: string;

  @IsString()
  testName!: string;

  @IsNumber()
  overallPercentile!: number;

  @IsNumber()
  overallScore!: number;

  @IsNumber()
  varcScore!: number;

  @IsNumber()
  dilrScore!: number;

  @IsNumber()
  qaScore!: number;

  @IsNumber()
  varcPercentile!: number;

  @IsNumber()
  dilrPercentile!: number;

  @IsNumber()
  qaPercentile!: number;

  @IsOptional()
  @IsNumber()
  accuracy?: number;

  @IsOptional()
  @IsInt()
  attemptedQuestions?: number;

  @IsOptional()
  @IsInt()
  correctQuestions?: number;

  @IsOptional()
  @IsInt()
  wrongQuestions?: number;

  @IsOptional()
  @IsInt()
  timeTaken?: number;
}