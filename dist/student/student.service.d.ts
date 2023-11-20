import { Student } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';
export declare class StudentService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getStudent(student_id: number): Promise<{
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
    getAllStudents(): Promise<{
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
    updateStudent(student_id: string, attr: Partial<Student>): Promise<void>;
}
