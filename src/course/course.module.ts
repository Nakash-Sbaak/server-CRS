import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CustomI18Service } from 'src/custom-i18n.service';
import { I18nModule } from 'nestjs-i18n';

@Module({
  providers: [CourseService, PrismaService, JwtService, CustomI18Service],
  controllers: [CourseController],
})
export class CourseModule {}
