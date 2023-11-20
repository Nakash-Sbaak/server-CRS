import { IsEmail, IsString } from "class-validator";

export class SignInStudent{

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}