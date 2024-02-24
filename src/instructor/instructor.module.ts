import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { StudentModule } from 'src/student/student.module';
import { StudentService } from 'src/student/student.service';

@Module({
  providers: [InstructorService, PrismaService, JwtService, StudentService],
  controllers: [InstructorController],
})
export class InstructorModule {}
