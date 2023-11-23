import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prismaService/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CourseService, PrismaService, JwtService],
  controllers: [CourseController],
})
export class CourseModule {}
