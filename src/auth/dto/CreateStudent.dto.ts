import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

export class SignUpStudentDTO {
  @IsNumber()
  student_id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
