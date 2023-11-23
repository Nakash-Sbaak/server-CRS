import { Type } from '@prisma/client';
export declare class NewCourseDTO {
    course_code: string;
    name: string;
    instructor_id: number;
    type: Type;
    credits: number;
}
