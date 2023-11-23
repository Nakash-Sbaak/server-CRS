import { Expose } from 'class-transformer';

export class StudentDTO {
  @Expose()
  student_id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  year_level: string;

  @Expose()
  total_credits_earned: string;

  @Expose()
  department_id: number;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;

}
