import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateStudentDTO{
    @IsNumber()
    student_id :number;

    @IsEmail()
    email: string;

    @IsString()
    password:string;

    @IsString()
    name:string;

    @IsNumber()
    level:number;

    @IsNumber()
    total_credits_earned:number

    @IsEnum([1,2])
    department_id:number;
}