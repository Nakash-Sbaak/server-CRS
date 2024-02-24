import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpStudentDTO } from './dto/SignUpStudent.dto';
import { Serialize } from 'src/Interceptor/serialize.interceptor';
import { StudentDTO } from './dto/Student.dto';
import { SignIn } from './dto/SignIn.dto';
import { log } from 'console';
import { NewPassword } from './dto/newPassword.dto';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { Role } from './enums/role.enum';

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

  @Post('/student/reset/password')
  async sendOtp(@Query('email') email: string, @Query('ar') ar: boolean) {
    return await this.authService.forgetPassword(email, ar);
  }

  @Post('/student/reset/:otp')
  async CheckOtp(@Param('otp') otp: string) {
    return await this.authService.checkOtp(otp);
  }

  @Patch('/student/reset/password')
  async resetPassword(
    @Query('email') email: string,
    @Query('otp') otp: string,
    @Body() body: NewPassword,
  ) {
    return await this.authService.resetPassword(email, otp, body.newPassword);
  }

  @Post('/student/verify')
  @UseGuards(AuthGuard, new RoleGuard(Role.Student))
  @HttpCode(200)
  async verifyStudent() {
    return {
      status: true,
    };
  }
}
