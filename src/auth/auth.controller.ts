import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpStudentDTO } from './dto/SignUpStudent.dto';
import { Serialize } from 'src/Interceptor/serialize.interceptor';
import { StudentDTO } from './dto/Student.dto';
import { SignIn } from './dto/SignIn.dto';

@Controller('auth')
@Serialize(StudentDTO)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Put('/student/signup')
  async StudentSignup(@Body() newStudent: SignUpStudentDTO) {
    return await this.authService.StudentSignUp(newStudent);
  }
  @Post('/student/signin')
  async StudentSignin(@Body() body: SignIn) {
    return await this.authService.StudentSignIn(body.email, body.password);
  }

  @Post('/instructor/signin')
  async InstructorSignin(@Body() body: SignIn) {
    return await this.authService.InstructorSignIn(body.email, body.password);
  }
}
