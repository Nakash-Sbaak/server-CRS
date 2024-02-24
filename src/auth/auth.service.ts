import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { SignUpStudent } from './interfaces/signUpStudent.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomI18Service } from 'src/custom-i18n.service';
import { MailService } from 'src/mail/mail.service';
import { join } from 'path';
import { log } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly i18n: CustomI18Service,
    private readonly emailService: MailService,
  ) {}

  async StudentSignUp(student: SignUpStudent) {
    // Check if student ID exists
    const checkStudent = await this.prismaService.student.findUnique({
      where: { student_id: student.student_id },
    });
    if (!checkStudent) {
      throw new HttpException(
        this.i18n.translate('signup.ST_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    // Check if the student is already signed up
    if (checkStudent.email) {
      throw new HttpException(
        this.i18n.translate('signup.SIGNED_UP'),
        HttpStatus.CONFLICT,
      );
    }

    // Check if email is available
    if (await this.checkEmail(student.email)) {
      throw new HttpException(
        this.i18n.translate('signup.EMAIL_EXIST'),
        HttpStatus.CONFLICT,
      );
    }

    try {
      // set password and email to student
      const hashPassword = await bcrypt.hash(student.password, 10);
      const newStudent = await this.prismaService.student.update({
        where: { student_id: student.student_id },
        data: {
          email: student.email,
          password: hashPassword,
        },
      });
      return newStudent;
    } catch (error) {
      throw error;
    }
  }

  async StudentSignIn(email: string, password: string) {
    try {
      const student = await this.prismaService.student.findUnique({
        where: { email: email },
      });

      if (!student) {
        throw new HttpException(
          this.i18n.translate('signin.EMAIL_NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (!isPasswordValid) {
        throw new HttpException(
          this.i18n.translate('signin.WRONG_PASS'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        student_id: student.student_id,
        role: 'student',
      };

      const access_token = await this.createAccessToken(payload);
      const refresh_token = await this.createRefreshToken(payload);
      return {
        ...student,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (error) {
      throw error;
    }
  }

  private async checkEmail(email: string): Promise<boolean> {
    try {
      const existingStudent = await this.prismaService.student.findUnique({
        where: { email: email },
      });
      return existingStudent ? true : false;
    } catch (error) {
      throw error;
    }
  }

  public async InstructorSignIn(email: string, password: string) {
    try {
      const instructor = await this.prismaService.instructor.findFirst({
        where: { email },
      });

      if (!instructor) {
        throw new HttpException(
          this.i18n.translate('signin.EMAIL_NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        instructor.password,
      );

      if (!isPasswordValid) {
        throw new HttpException(
          this.i18n.translate('signin.WRONG_PASS'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      const payload = {
        instructor_id: instructor.instructor_id,
        role: 'instructor',
      };

      const access_token = await this.createAccessToken(payload);
      const refresh_token = await this.createRefreshToken(payload);
      return {
        ...instructor,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (error) {
      throw error;
    }
  }
  async forgetPassword(email: string, ar: boolean) {
    try {
      const student = await this.prismaService.student.findUnique({
        where: { email: email },
      });

      if (!student) {
        throw new HttpException(
          this.i18n.translate('signin.EMAIL_NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }

      const { otp } = await this.emailService.sendUserOtp(student.email, ar);
      student.otp = otp;
      student.otpExpiry = (Date.now() + 5 * 60 * 1000) as any;
      await this.prismaService.student.update({
        where: { email: student.email },
        data: student,
      });
      return 'email send successfully';
    } catch (error) {
      throw error;
    }
  }
  async checkOtp(otp: string) {
    try {
      const student = await this.prismaService.student.findUnique({
        where: {
          otp,
        },
      });

      return student ? student : 'invalid OTP';
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    try {
      const student = await this.prismaService.student.findUnique({
        where: { email, otp },
      });
      // check student and update password
      //TODO:translate it
      if (student.otpExpiry < Date.now()) {
        throw new HttpException('expired OTP', HttpStatus.FORBIDDEN);
      }
      if (!student) {
        throw new HttpException('invalid OTP or email', HttpStatus.BAD_REQUEST);
      }
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      student.password = hashNewPassword;
      student.otp = null;
      student.otpExpiry = null;
      return await this.prismaService.student.update({
        where: { email },
        data: student,
      });
    } catch (error) {
      throw error;
    }
  }
  private async createAccessToken(payload: Object): Promise<string> {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });
      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  private async createRefreshToken(payload: Object): Promise<string> {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '20h',
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}
