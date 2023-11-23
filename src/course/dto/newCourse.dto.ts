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

export class NewCourseDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(8)
  course_code: string;

  @IsString()
  name: string;

  @IsNumber()
  instructor_id: number;

  @IsEnum(Type)
  type: Type;

  @IsInt()
  @Min(1)
  @Max(4)
  credits: number;
}
