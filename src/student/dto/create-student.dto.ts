import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  student_id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsInt()
  total_credits_earned?: number;

  @IsInt()
  department_id: number;

  @IsInt()
  gpa: string;

  @IsNumberString()
  enrollment_at: string;
}
