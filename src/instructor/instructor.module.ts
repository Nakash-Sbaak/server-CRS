import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'src/prismaService/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [InstructorService, PrismaService, JwtService],
  controllers: [InstructorController],
})
export class InstructorModule {}
