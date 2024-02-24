import { Exclude, Expose } from 'class-transformer';

export class StudentDTO {
  @Exclude()
  password: string;

  @Exclude()
  otp: number;

  @Exclude()
  otpExpiry: Date;
}
 