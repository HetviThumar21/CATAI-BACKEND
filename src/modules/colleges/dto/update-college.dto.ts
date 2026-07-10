import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateCollegeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  type?: string;

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