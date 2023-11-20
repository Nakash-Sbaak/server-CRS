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

  async signUp(student: SignUpStudent) {
    // Check if student ID exists
    if (await this.checkStudentId(student.student_id)) {
      throw new HttpException('Student ID already exists', HttpStatus.CONFLICT);
    }
    // Check if email exists
    if (await this.checkEmail(student.email)) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    try {
      // Create the student
      const hashPassword = await bcrypt.hash(student.password, 10);

      const newStudent = await this.prismaService.student.create({
        data: {
          student_id: student.student_id,
          name: student.name,
          email: student.email,
          level: student.level,
          total_credits_earned: student.total_credits_earned,
          password: hashPassword,
          department_id: student.department_id,
        },
      });
      return newStudent;
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string) {
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
      // console.log(process.env.JWT_SECRET);

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

  private async checkStudentId(student_id: number): Promise<boolean> {
    try {
      const existingStudent = await this.prismaService.student.findUnique({
        where: { student_id: student_id },
      });
      return existingStudent ? true : false;
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
}
