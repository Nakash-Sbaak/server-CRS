import { CourseService } from './course.service';
import { NewCourseDTO } from './dto/newCourse.dto';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(body: NewCourseDTO): Promise<{
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
    updateCourse(code: string, body: UpdateCourseDTO): Promise<{
        course_code: string;
        name: string;
        credits: number;
        type: import("@prisma/client").$Enums.Type;
        instructor: {
            name: string;
        };
    }>;
    deleteCourse(code: string): Promise<string>;
}
