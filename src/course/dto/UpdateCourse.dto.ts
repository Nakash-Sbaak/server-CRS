import { Type } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateCourseDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(8)
  @IsOptional()
  course_code: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  instructor_id: number;

  @IsEnum(Type)
  @IsOptional()
  type: Type;

  @IsInt()
  @Min(1)
  @Max(4)
  @IsOptional()
  credits: number;
}
