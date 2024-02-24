import { Exclude } from 'class-transformer';

export class InstructorSerializer {
  @Exclude()
  password: string;
}
