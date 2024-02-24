import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createManyStudents(student: CreateStudentDto[]) {
    try {
      const students = await this.prismaService.student.createMany({
        data: student,
        skipDuplicates: true, // don't throw error if data already exists in the database.
      });

      return students;
    } catch (error) {
      throw error;
    } finally {
      this.prismaService.$disconnect();
    }
  }
  
  public async getStudent(student_id: number) {
    try {
      return await this.prismaService.student.findUnique({
        where: { student_id: student_id },
      });
    } catch (error) {
      throw error;
    } finally {
      this.prismaService.$disconnect();
    }
  }

  public async getAllStudents() {
    const students = await this.prismaService.student.findMany();
    if (students.length == 0) {
      throw new HttpException('No students found', HttpStatus.NOT_FOUND);
    }
    return students;
  }

  public async updateStudent(student_id: string, attr: Partial<Student>) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
