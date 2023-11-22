import { AuthService } from './auth.service';
import { SignUpStudentDTO } from './dto/CreateStudent.dto';
import { SignInStudent } from './dto/SignIn.dto';
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
    StudentSignin(body: SignInStudent): Promise<{
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
    testJwt(): Promise<void>;
}
