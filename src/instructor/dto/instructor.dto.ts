import { Expose } from 'class-transformer';

export class InstructorSerializer {
  @Expose()
  name: string;
  
  @Expose()
  email: string;
  
  @Expose()
  phone: string;

}
