import { PrismaService } from 'src/prismaService/prisma.service';
export declare class InstructorService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<{
        instructor_id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
    }[]>;
}
