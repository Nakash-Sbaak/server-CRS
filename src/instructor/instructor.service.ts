import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CellValue, Workbook } from 'exceljs';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { StudentService } from 'src/student/student.service';
@Injectable()
export class InstructorService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly studentService: StudentService,
  ) {}

  async getAll() {
    return await this.prismaService.instructor.findMany();
  }

  async uploadStudents(file: Express.Multer.File) {
    try {
      const workbook = new Workbook();

      await workbook.xlsx.load(file.buffer);
      const worksheet = workbook.getWorksheet(1);
      const headers = worksheet.getRow(1).values as CellValue[];
      const rows: CreateStudentDto[] = [];

      for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const row = worksheet.getRow(rowNumber).values;

        const requiredColumns = [
          'NAME',
          'DEPARTMENT',
          'ID',
          'GPA',
          'ENROLLMENT_AT',
        ];

        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header.toString()] = row[index];
        });

        const missingColumns = requiredColumns.filter(
          (column) => !rowData.hasOwnProperty(column),
        );
        if (missingColumns.length > 0) {
          throw new BadRequestException(
            `Missing columns: ${missingColumns.join(', ')}`,
          );
        }

        const student: CreateStudentDto = {
          name: rowData['NAME'],
          department_id: rowData['DEPARTMENT'] == 'COMPUTER SCIENCE' ? 1 : 2,
          student_id: rowData['ID'],
          gpa: rowData['GPA'].toString(),
          enrollment_at: rowData['ENROLLMENT_AT'].toString(),
        };
        rows.push(student);
      }
      return await this.studentService.createManyStudents(rows);
    } catch (error) {
      throw error;
    }
  }
}
