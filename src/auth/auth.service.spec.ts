// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SignUpStudent } from './interfaces/signUpStudent.interface';
import { CustomI18Service } from 'src/custom-i18n.service';

jest.mock('src/db/prisma.service');
jest.mock('@nestjs/jwt');
jest.mock('bcrypt');
jest.mock('nestjs-i18n');

// it('Auth Module', () => {});

describe('AuthService', () => {
  let authService: AuthService;
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
  };
  let jwtService: JwtService;
  let i18nService: CustomI18Service;
  beforeEach(async () => {
    const i18nServiceMock = {
      t: () => 'test',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, CustomI18Service],
    })
      .overrideProvider(CustomI18Service)
      .useValue(i18nServiceMock)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('StudentSignUp', () => {
    it('should throw NOT_FOUND if student ID does not exist', async () => {
      // Implement your test here
    });

    it('should throw CONFLICT if the student is already signed up', async () => {
      // Implement your test here
    });

    it('should throw CONFLICT if email already exists', async () => {
      // Implement your test here
    });

    it('should create a new student and return it', async () => {
      // Implement your test here
    });

    it('should throw an error if any exception occurs', async () => {
      // Implement your test here
    });
  });

  describe('StudentSignIn', () => {
    it('should throw NOT_FOUND if email does not exist', async () => {
      // Implement your test here
    });

    it('should throw UNAUTHORIZED if password is incorrect', async () => {
      // Implement your test here
    });

    it('should create access and refresh tokens on successful sign-in', async () => {
      // Implement your test here
    });

    it('should throw an error if any exception occurs', async () => {
      // Implement your test here
    });
  });

  describe('InstructorSignIn', () => {
    // Add similar tests for the InstructorSignIn method
  });

  // Add more test cases for other methods as needed

  afterEach(() => {
    jest.clearAllMocks();
  });
});