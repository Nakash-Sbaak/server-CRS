import { Student } from '@prisma/client';
 export interface SignUpStudent {
    student_id: number;
    email: string;
    password: string;
 }