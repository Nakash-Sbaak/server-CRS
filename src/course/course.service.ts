import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course as PrismaCourse } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createCourse(course: PrismaCourse) {
    try {
      // Check if course code is unique
      const existingCourse = await this.prismaService.course.findUnique({
        where: { course_code: course.course_code },
      });
      // select * from course where course_code = 1;
      if (existingCourse) {
        throw new HttpException(
          'Course code must be unique',
          HttpStatus.CONFLICT,
        );
      }
      // Check if instructor not exists
      if (!(await this.checkInstructorExistence(course.instructor_id))) {
        throw new HttpException('Instructor not found', HttpStatus.NOT_FOUND);
      }

      // Create a new course
      const newCourse = await this.prismaService.course.create({
        data: {
          course_code: course.course_code,
          name: course.name,
          instructor_id: course.instructor_id,
          type: course.type,
          credits: course.credits,
        },
        select: {
          course_code: true,
          name: true,
          credits: true,
          type: true,
          instructor: {
            select: {
              name: true,
            },
          },
        },
      });
      return newCourse;
    } catch (error) {
      throw error;
    }
  }
  async getAllCourses() {
    try {
      const allCoursesWithPrerequisites =
        await this.prismaService.course.findMany({
          select: {
            course_code: true,
            name: true,
            credits: true,
            type: true,
            instructor: {
              select: {
                name: true,
              },
            },
            courses: {
              select: {
                course_code: false,
                course_prerequisites_code: false,
                course_prerequisites: {
                  select: {
                    course_code: true,
                    name: true,
                    credits: true,
                    type: true,
                    instructor: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      return allCoursesWithPrerequisites;
    } catch (error) {
      throw error;
    }
  }

  public async addPrerequisiteCourse(
    course_code: string,
    prerequisite_course_code: string,
  ) {
    try {
      //check  course exists or not
      if (!(await this.checkCourseExistence(course_code))) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      //check  prerequisite  course exists or not
      if (!(await this.checkCourseExistence(prerequisite_course_code))) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      const result = await this.prismaService.coursePrerequisites.create({
        data: {
          course_code: course_code,
          course_prerequisites_code: prerequisite_course_code,
        },
      });
      console.log(result);

      return result
        ? { message: 'course added successfully' }
        : { message: 'some thing wrong' };
    } catch (error) {
      throw error;
    }
  }
  public async updateCourse(code: string, attr: Partial<PrismaCourse>) {
    try {
      // Check if course exists
      const existingCourse = await this.prismaService.course.findUnique({
        where: { course_code: code },
      });
      if (!existingCourse) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      //Update course
      const updatedCourse = await this.prismaService.course.update({
        where: { course_code: code },
        data: {
          name: attr.name,
          credits: attr.credits,
          type: attr.type,
          instructor_id: attr.instructor_id,
        },
        select: {
          course_code: true,
          name: true,
          credits: true,
          type: true,
          instructor: {
            select: {
              name: true,
            },
          },
        },
      });
      return updatedCourse;
    } catch (error) {
      throw error;
    }
  }
  public async deleteCourse(code: string) {
    try {
      // Check Course existence
      const existingCourse = await this.prismaService.course.findUnique({
        where: { course_code: code },
      });

      if (!existingCourse) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      await this.prismaService.course.delete({
        where: {
          course_code: code,
        },
      });
      return { message: 'course deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
  private async checkInstructorExistence(id: number): Promise<boolean> {
    try {
      const existingInstructor = await this.prismaService.instructor.findUnique(
        {
          where: { instructor_id: id },
        },
      );
      return existingInstructor ? true : false;
    } catch (error) {
      throw error;
    }
  }
  private async checkCourseExistence(code: string): Promise<boolean> {
    try {
      const existingCourse = await this.prismaService.course.findUnique({
        where: { course_code: code },
      });
      return existingCourse ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
