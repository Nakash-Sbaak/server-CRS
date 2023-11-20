import { Student } from '@prisma/client';
 export interface SignUpStudent {
    student_id: number;
    email: string;
    name: string;
    password: string;
    level: number;
    total_credits_earned: number;
    department_id: number;
}