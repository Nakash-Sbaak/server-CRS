import { PrismaService } from 'src/prismaService/prisma.service';
import { SignUpStudent } from './interfaces/signUpStudent.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    StudentSignUp(student: SignUpStudent): Promise<{
        student_id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        total_credits_earned: number;
        department_id: number;
    }>;
    StudentSignIn(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
        student_id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        total_credits_earned: number;
        department_id: number;
    }>;
    private checkEmail;
    InstructorSignIn(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
        instructor_id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
    }>;
    private createAccessToken;
    private createRefreshToken;
}
