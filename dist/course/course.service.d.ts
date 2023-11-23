import { Course as PrismaCourse } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';
export declare class CourseService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createCourse(course: PrismaCourse): Promise<{
        course_code: string;
        name: string;
        credits: number;
        type: import("@prisma/client").$Enums.Type;
        instructor: {
            name: string;
        };
    }>;
    getAllCourses(): Promise<{
        course_code: string;
        name: string;
        credits: number;
        type: import("@prisma/client").$Enums.Type;
        instructor: {
            name: string;
        };
        courses: {
            course_prerequisites: {
                course_code: string;
                name: string;
                credits: number;
                type: import("@prisma/client").$Enums.Type;
                instructor: {
                    name: string;
                };
            };
        }[];
    }[]>;
    updateCourse(code: string, attr: Partial<PrismaCourse>): Promise<{
        course_code: string;
        name: string;
        credits: number;
        type: import("@prisma/client").$Enums.Type;
        instructor: {
            name: string;
        };
    }>;
    deleteCourse(code: string): Promise<string>;
    private checkInstructorExistence;
    private checkCourseExistence;
}
