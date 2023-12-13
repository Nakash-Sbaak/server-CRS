// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SignUpStudent } from './interfaces/signUpStudent.interface';
import { CustomI18Service } from 'src/custom-i18n.service';
import { Student } from '@prisma/client';

jest.mock('src/db/prisma.service');
jest.mock('@nestjs/jwt');
jest.mock('bcrypt');
jest.mock('src/custom-i18n.service');

describe('AuthService', () => {
  let authService: AuthService;
  const mockPrismaService = {
    instructor: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
    student: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };
  const mockI18n = {
    translate: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, CustomI18Service],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(CustomI18Service)
      .useValue(mockI18n)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('StudentSignUp', () => {
    it('should throw NOT_FOUND if student ID does not exist', async () => {
      const mockStudent = {
        student_id: 1,
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce(null);
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      await expect(
        authService.StudentSignUp(mockStudent as SignUpStudent),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.NOT_FOUND),
      );
      expect(mockPrismaService.student.findUnique).toHaveBeenCalledWith({
        where: { student_id: mockStudent.student_id },
      });
    });

    it('should throw CONFLICT if the student is already signed up', async () => {
      const mockStudent = {
        student_id: 1,
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce(mockStudent);
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      await expect(
        authService.StudentSignUp(mockStudent as SignUpStudent),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.CONFLICT),
      );
      expect(mockPrismaService.student.findUnique).toHaveBeenCalledWith({
        where: { student_id: mockStudent.student_id },
      });
    });

    it('should throw CONFLICT if email already exists', async () => {
      const mockStudent = {
        student_id: 1,
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce(null);
      mockPrismaService.student.findUnique.mockResolvedValueOnce(
        mockStudent.email,
      );
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      await expect(
        authService.StudentSignUp(mockStudent as SignUpStudent),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.CONFLICT),
      );
      expect(mockPrismaService.student.findUnique).toHaveBeenCalledWith({
        where: { student_id: mockStudent.student_id },
      });
    });

    it('should create a new student and return it', async () => {
      const mockStudent = {
        student_id: 1,
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce({});
      mockPrismaService.student.update.mockResolvedValueOnce(mockStudent);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashTest' as never);
      const result = await authService.StudentSignUp(mockStudent as Student);
      expect(result).toBeDefined();
      expect(result).toEqual(mockStudent);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockStudent.password, 10);
      expect(mockPrismaService.student.update).toHaveBeenCalledWith({
        where: { student_id: mockStudent.student_id },
        data: {
          email: mockStudent.email,
          password: 'hashTest', // Assuming bcrypt.hash returns a fixed value in the test
        },
      });
    });
  });

  describe('StudentSignIn', () => {
    it('should throw NOT_FOUND if email does not exist', async () => {
      const mockStudent = {
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce(null);
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      await expect(
        authService.StudentSignIn(mockStudent.email, mockStudent.password),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw UNAUTHORIZED if password is incorrect', async () => {
      const mockStudent = {
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce({});
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        authService.StudentSignIn(mockStudent.email, mockStudent.password),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('InstructorSignIn', () => {
    it('should throw NOT_FOUND if email does not exist', async () => {
      const mockStudent = {
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.instructor.findFirst.mockResolvedValueOnce(null);
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      await expect(
        authService.InstructorSignIn(mockStudent.email, mockStudent.password),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw UNAUTHORIZED if password is incorrect', async () => {
      const mockStudent = {
        email: 'dfa#fda.com',
        password: 'r3eaq',
      };
      mockPrismaService.student.findUnique.mockResolvedValueOnce({});
      mockI18n.translate.mockImplementationOnce(
        (key, options) => 'error message',
      );
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        authService.InstructorSignIn(mockStudent.email, mockStudent.password),
      ).rejects.toThrow(
        new HttpException('error message', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  // Add more test cases for other methods as needed

  afterEach(() => {
    jest.clearAllMocks();
  });
});
