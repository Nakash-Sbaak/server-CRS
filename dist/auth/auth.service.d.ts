import { PrismaService } from 'src/prismaService/prisma.service';
import { SignUpStudent } from './interfaces/signUpStudent.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    signUp(student: SignUpStudent): Promise<{
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
    signIn(email: string, password: string): Promise<{
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
    private checkStudentId;
    private createAccessToken;
    private createRefreshToken;
}
