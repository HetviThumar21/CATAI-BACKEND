import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCollegeDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @IsInt()
  establishedYear?: number;

  @IsOptional()
  @IsInt()
  nirfRank?: number;

  @IsOptional()
  @IsNumber()
  fees?: number;

  @IsOptional()
  @IsNumber()
  avgPackage?: number;

  @IsOptional()
  @IsNumber()
  highestPackage?: number;

  @IsOptional()
  @IsUrl()
  officialWebsite?: string;

  @IsOptional()
  @IsInt()
  seats?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}