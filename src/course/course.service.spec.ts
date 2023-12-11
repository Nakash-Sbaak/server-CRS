import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Course } from '@prisma/client';

jest.mock('src/db/prisma.service');

describe('CourseService', () => {
  let courseService: CourseService;
  const mockPrismaService = {
    course: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    instructor: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    coursePrerequisites: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    courseService = module.get<CourseService>(CourseService);
  });

  describe('createCourse', () => {
    it('should create a new course and return it', async () => {
      const courseData = {
        course_code: 'CS101',
        name: 'Introduction to Computer Science',
        instructor_id: 1,
        type: 'Elective',
        credits: 3,
      };

      mockPrismaService.course.findUnique.mockResolvedValueOnce(null);
      mockPrismaService.instructor.findUnique.mockResolvedValueOnce({});
      mockPrismaService.course.create.mockResolvedValueOnce({
        ...courseData,
        course_id: 2,
        instructor: {
          name: 'ashaf',
        },
      });
      const result = await courseService.createCourse(courseData as Course);
      expect(result).toEqual({
        ...courseData,
        course_id: 2,
        instructor: {
          name: 'ashaf',
        },
      });
      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { course_code: courseData.course_code },
      });
      expect(mockPrismaService.instructor.findUnique).toHaveBeenCalledWith({
        where: { instructor_id: courseData.instructor_id },
      });
      expect(result).toBeDefined();
    });

    it('should throw CONFLICT if course code is not unique', async () => {
      const courseData = {
        course_code: 'CS101',
        name: 'Introduction to Computer Science',
        instructor_id: 1,
        type: 'Elective',
        credits: 3,
      };
      mockPrismaService.course.findUnique.mockResolvedValueOnce(courseData);

      await expect(
        courseService.createCourse(courseData as Course),
      ).rejects.toThrow(
        new HttpException('Course code must be unique', HttpStatus.CONFLICT),
      );
    });

    it('should throw NOT_FOUND if instructor does not exist', async () => {
      const courseData = {
        course_code: 'CS101',
        name: 'Introduction to Computer Science',
        instructor_id: 1,
        type: 'Elective',
        credits: 3,
      };
      mockPrismaService.course.findUnique.mockResolvedValueOnce(null);
      mockPrismaService.instructor.findUnique.mockResolvedValueOnce(null);
      await expect(
        courseService.createCourse(courseData as Course),
      ).rejects.toThrow(
        new HttpException('Instructor not found', HttpStatus.CONFLICT),
      );
    });
  });

  describe('getAllCourses', () => {
    it('should return all courses with prerequisites', async () => {
      mockPrismaService.course.findUnique.mockResolvedValueOnce(null);
      mockPrismaService.instructor.findUnique.mockResolvedValueOnce({});
      mockPrismaService.course.findMany.mockResolvedValueOnce({
        course_code: 'MCD34',
        name: 'introduction to computer science',
        credits: 2,
        type: 'REQUIRED',
        instructor: {
          name: 'ASHAF',
        },
        courses: [
          {
            course_prerequisites: {
              course_code: 'MCF34',
              name: 'probably and statistics',
              credits: 5,
              type: 'REQUIRED',
              instructor: {
                name: 'ASHAF',
              },
            },
          },
        ],
      });
      const result = await courseService.getAllCourses();
      expect(result).toEqual({
        course_code: 'MCD34',
        name: 'introduction to computer science',
        credits: 2,
        type: 'REQUIRED',
        instructor: {
          name: 'ASHAF',
        },
        courses: [
          {
            course_prerequisites: {
              course_code: 'MCF34',
              name: 'probably and statistics',
              credits: 5,
              type: 'REQUIRED',
              instructor: {
                name: 'ASHAF',
              },
            },
          },
        ],
      });
      expect(result).toBeDefined();
    });
  });

  describe('updateCourse', () => {
    it('should throw NOT_FOUND if the course does not exist', async () => {
      mockPrismaService.course.findUnique.mockResolvedValueOnce(null);
      await expect(courseService.updateCourse('test', {})).rejects.toThrow(
        new HttpException('Course not found', HttpStatus.NOT_FOUND),
      );
      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { course_code: 'test' },
      });
    });

    it('should update an existing course and return it', async () => {
      const existingCourseCode = 'CS101';
      const updatedCourseData = {
        name: 'Updated Course Name',
        credits: 4,
      };

      const existingCourse = {
        course_code: existingCourseCode,
        name: 'Original Course Name',
        credits: 3,
        instructor: {
          name: 'Original Instructor',
        },
      };

      mockPrismaService.course.findUnique.mockResolvedValueOnce(existingCourse);
      mockPrismaService.course.update.mockResolvedValueOnce({
        ...existingCourse,
        ...updatedCourseData,
      });

      const result = await courseService.updateCourse(
        existingCourseCode,
        updatedCourseData,
      );

      // Assert
      expect(result).toEqual({
        ...existingCourse,
        ...updatedCourseData,
      });
      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { course_code: existingCourseCode },
      });
    });
  });

  describe('deleteCourse', () => {
    it('should delete an existing course and return success message', async () => {
      const existingCourseCode = 'CS101';

      mockPrismaService.course.findUnique.mockResolvedValueOnce({
        course_code: existingCourseCode,
      });

      const result = await courseService.deleteCourse(existingCourseCode);

      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { course_code: existingCourseCode },
      });
      expect(mockPrismaService.course.delete).toHaveBeenCalledWith({
        where: { course_code: existingCourseCode },
      });
      expect(result).toEqual({ message: 'course deleted successfully' });
    });

    it('should throw NOT_FOUND if the course does not exist', async () => {
      const nonExistingCourseCode = 'nonexistent';
      mockPrismaService.course.findUnique.mockResolvedValueOnce(null);

      await expect(
        courseService.deleteCourse(nonExistingCourseCode),
      ).rejects.toThrow(
        new HttpException('Course not found', HttpStatus.NOT_FOUND),
      );

      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { course_code: nonExistingCourseCode },
      });
    });
  });

  describe('AddPrerequisiteCourse', () => {
    it('should add a prerequisite course and return success message', async () => {
      const courseCode = 'CS101';
      const prerequisiteCourseCode = 'CS102';
      mockPrismaService.course.findUnique.mockResolvedValueOnce({});
      mockPrismaService.course.findUnique.mockResolvedValueOnce({});
      mockPrismaService.coursePrerequisites.create.mockResolvedValueOnce({});
      const result = await courseService.addPrerequisiteCourse(
        courseCode,
        prerequisiteCourseCode,
      );
      expect(result).toEqual({ message: 'course added successfully' });
      expect(mockPrismaService.course.findUnique).toHaveBeenCalledWith({
        where: { course_code: courseCode },
      });
      expect(mockPrismaService.coursePrerequisites.create).toHaveBeenCalled();
    });

    it('should throw NOT_FOUND if the course does not exist', async () => {
      const courseCode = 'CS101';
      const prerequisiteCourseCode = 'CS102';
      mockPrismaService.course.findUnique.mockResolvedValueOnce(null);
      await expect(
        courseService.addPrerequisiteCourse(courseCode, prerequisiteCourseCode),
      ).rejects.toThrow(
        new HttpException('course not found', HttpStatus.NOT_FOUND),
      );
    });
    expect(mockPrismaService.coursePrerequisites.create).not.toHaveBeenCalled();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
