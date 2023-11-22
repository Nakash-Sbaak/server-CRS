import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { SignUpStudent } from './interfaces/signUpStudent.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async StudentSignUp(student: SignUpStudent) {
    // Check if student ID exists
    const checkStudent = await this.prismaService.student.findUnique({
      where: { student_id: student.student_id },
    });
    if (!checkStudent) {
      throw new HttpException('Student ID not found', HttpStatus.NOT_FOUND);
    }
    // Check if the student is already signed up
    if (checkStudent.email) {
      throw new HttpException(
        'This student is already signed up',
        HttpStatus.CONFLICT,
      );
    }

    // Check if email is available
    if (await this.checkEmail(student.email)) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
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
      const student = await this.prismaService.student.findFirst({
        where: { email: email },
      });

      if (!student) {
        throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (!isPasswordValid) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
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
        where: { email: email },
      });

      if (!instructor) {
        throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        instructor.password,
      );

      if (!isPasswordValid) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }
      const payload = {
        student_id: instructor.instructor_id,
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
        expiresIn: '30d',
      });
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
  // private async checkStudentId(student_id: number): Promise<boolean> {
  //   try {
  //     const existingStudent = await this.prismaService.student.findUnique({
  //       where: { student_id: student_id },
  //     });
  //     return existingStudent ? true : false;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
