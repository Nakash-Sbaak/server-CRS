import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { Serialize } from '../Interceptor/serialize.interceptor';
import { StudentDTO } from '../auth/dto/Student.dto';

@Controller('student')
@Serialize(StudentDTO)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
}
