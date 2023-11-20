import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  // public async createStudent(student: Partial<Student>) {
  //   // Check if student ID exists
  //   if (await this.checkStudentId(student.student_id)) {
  //     throw new HttpException('Student ID already exists', HttpStatus.CONFLICT);
  //   }
  //   // Check if email exists
  //   if (await this.checkEmail(student.email)) {
  //     throw new HttpException('Email already exists', HttpStatus.CONFLICT);
  //   }
  //   try {
  //     // Create the student
  //     const newStudent = await this.prismaService.student.create({
  //       data: {
  //         student_id: student.student_id,
  //         name: student.name,
  //         email: student.email,
  //         level: student.level,
  //         total_credits_earned: student.total_credits_earned,
  //         password: student.password,
  //         department_id:student.department_id
  //       },
  //     });
  //     return  newStudent ;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async getStudent(student_id: number) {
    try {
      return await this.prismaService.student.findUnique({
        where: { student_id: student_id },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getAllStudents() {
    try {
      return await this.prismaService.student.findFirst();
    } catch (error) {
      throw error;
    }
  }

  public async updateStudent(student_id: string, attr: Partial<Student>) {
    try {
        
    } catch (error) {
      throw error;
    }
  }

}
