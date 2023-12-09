// // auth.service.spec.ts
// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { PrismaService } from 'src/db/prisma.service';
// import { JwtService } from '@nestjs/jwt';
// import { I18nService } from 'nestjs-i18n';
// import * as bcrypt from 'bcrypt';
// import { HttpException, HttpStatus } from '@nestjs/common';
// import { SignUpStudent } from './interfaces/signUpStudent.interface';

// jest.mock('src/db/prisma.service');
// jest.mock('@nestjs/jwt');
// jest.mock('bcrypt');
// jest.mock('nestjs-i18n');

it('Auth Module', () => {});

// describe('AuthService', () => {
//   let authService: AuthService;
//   let prismaService: PrismaService;
//   let jwtService: JwtService;
//   let i18nService: I18nService;
//   beforeEach(async () => {
//     const i18nServiceMock = {
//       t: () => 'test',
//     };
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         PrismaService,
//         JwtService,
//         I18nService,
//       ],
//     }).compile();

//     authService = module.get<AuthService>(AuthService);
//     prismaService = module.get<PrismaService>(PrismaService);
//     jwtService = module.get<JwtService>(JwtService);
//     i18nService = module.get<I18nService>(I18nService);
//   });

//   describe('StudentSignUp', () => {
//     it('should throw NOT_FOUND if student ID does not exist', async () => {
//       // Implement your test here
//     });

//     it('should throw CONFLICT if the student is already signed up', async () => {
//       // Implement your test here
//     });

//     it('should throw CONFLICT if email already exists', async () => {
//       // Implement your test here
//     });

//     it('should create a new student and return it', async () => {
//       // Implement your test here
//     });

//     it('should throw an error if any exception occurs', async () => {
//       // Implement your test here
//     });
//   });

//   describe('StudentSignIn', () => {
//     it('should throw NOT_FOUND if email does not exist', async () => {
//       // Implement your test here
//     });

//     it('should throw UNAUTHORIZED if password is incorrect', async () => {
//       // Implement your test here
//     });

//     it('should create access and refresh tokens on successful sign-in', async () => {
//       // Implement your test here
//     });

//     it('should throw an error if any exception occurs', async () => {
//       // Implement your test here
//     });
//   });

//   describe('InstructorSignIn', () => {
//     // Add similar tests for the InstructorSignIn method
//   });

//   // Add more test cases for other methods as needed

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
// });
// function mockDeep<T>() {
//   throw new Error('Function not implemented.');
// }
