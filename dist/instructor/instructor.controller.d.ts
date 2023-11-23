import { InstructorService } from './instructor.service';
export declare class InstructorController {
    private readonly instructorService;
    constructor(instructorService: InstructorService);
    getALl(): Promise<{
        instructor_id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
    }[]>;
}
