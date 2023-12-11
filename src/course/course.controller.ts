import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { NewCourseDTO } from './dto/newCourse.dto';
import { Course as PrismaCourse } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';

@Controller('course')
@UseGuards(AuthGuard, new RoleGuard(Role.Instructor))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/new')
  async createCourse(@Body() body: NewCourseDTO) {
    return await this.courseService.createCourse(body as PrismaCourse);
  }

  @Post('/addPre')
  async addPrerequisiteCourse(
    @Query('course_code') course_code: string,
    @Query('pre_course_code ') pre_course_code: string,
  ) {
    return await this.courseService.addPrerequisiteCourse(
      course_code,
      pre_course_code,
    );
  }

  @Get('/all')
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Put('/update/:code')
  async updateCourse(
    @Param('code') code: string,
    @Body() body: UpdateCourseDTO,
  ) {
    return await this.courseService.updateCourse(code, body);
  }

  @Delete('/delete/:code')
  async deleteCourse(@Param('code') code: string) {
    return await this.courseService.deleteCourse(code);
  }
}
