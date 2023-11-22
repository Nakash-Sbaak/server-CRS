import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpStudentDTO } from './dto/CreateStudent.dto';
import { Serialize } from 'src/student/Interceptor/serialize.interceptor';
import { StudentDTO } from './dto/Student.dto';
import { SignInStudent } from './dto/SignIn.dto';
import { AuthGuard } from './guard/auth.guard';
import { Role } from './decorator/role.enum';
import { RoleGuard } from './guard/role.guard';

// import { RoleGuard } from './guard/role.guard';

@Controller('auth')
@Serialize(StudentDTO)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Put('/student/signup')
  async StudentSignup(@Body() newStudent: SignUpStudentDTO) {
    return await this.authService.signUp(newStudent);
  }
  @Post('/student/signin')
  async StudentSignin(@Body() body: SignInStudent) {
    return await this.authService.signIn(body.email, body.password);
  }

  @Post('/test')
  @UseGuards(AuthGuard, new RoleGuard(Role.Student))
  async testJwt() {
    console.log('success');
  }
}
