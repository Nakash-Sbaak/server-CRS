import { AuthService } from './auth.service';
import { SignUpStudentDTO } from './dto/CreateStudent.dto';
import { SignIn } from './dto/SignIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    StudentSignup(newStudent: SignUpStudentDTO): Promise<{
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
    StudentSignin(body: SignIn): Promise<{
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
    InstructorSignin(body: SignIn): Promise<{
        access_token: string;
        refresh_token: string;
        instructor_id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
    }>;
    testJwt(): Promise<void>;
}
