import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SignUpStudentDTO {
  @IsNumber()
  student_id: number;

  @IsEmail()
  email: string;

  @IsString()
  // @MinLength(8)
  password: string;
}
