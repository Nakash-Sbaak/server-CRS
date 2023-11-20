import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDTO } from '../auth/dto/CreateStudent.dto';
import { StudentService } from './student.service';
import { Serialize } from './Interceptor/serialize.interceptor';
import { StudentDTO } from '../auth/dto/Student.dto';

@Controller('student')
@Serialize(StudentDTO)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

 
}
