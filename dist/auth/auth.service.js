"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prismaService/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async signUp(student) {
        if (await this.checkStudentId(student.student_id)) {
            throw new common_1.HttpException('Student ID already exists', common_1.HttpStatus.CONFLICT);
        }
        if (await this.checkEmail(student.email)) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
        }
        try {
            const hashPassword = await bcrypt.hash(student.password, 10);
            const newStudent = await this.prismaService.student.create({
                data: {
                    student_id: student.student_id,
                    name: student.name,
                    email: student.email,
                    level: student.level,
                    total_credits_earned: student.total_credits_earned,
                    password: hashPassword,
                    department_id: student.department_id,
                },
            });
            return newStudent;
        }
        catch (error) {
            throw error;
        }
    }
    async signIn(email, password) {
        try {
            const student = await this.prismaService.student.findFirst({
                where: { email: email },
            });
            if (!student) {
                throw new common_1.HttpException('Email not found', common_1.HttpStatus.NOT_FOUND);
            }
            const isPasswordValid = await bcrypt.compare(password, student.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException('Wrong password', common_1.HttpStatus.UNAUTHORIZED);
            }
            const payload = {
                student_id: student.student_id,
                role: 'student',
            };
            const access_token = await this.createAccessToken(payload);
            const refresh_token = await this.createRefreshToken(payload);
            return {
                ...student,
                access_token: access_token,
                refresh_token: refresh_token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async checkEmail(email) {
        try {
            const existingStudent = await this.prismaService.student.findUnique({
                where: { email: email },
            });
            return existingStudent ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async checkStudentId(student_id) {
        try {
            const existingStudent = await this.prismaService.student.findUnique({
                where: { student_id: student_id },
            });
            return existingStudent ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async createAccessToken(payload) {
        try {
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m',
            });
            return accessToken;
        }
        catch (error) {
            throw error;
        }
    }
    async createRefreshToken(payload) {
        try {
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '30d',
            });
            return accessToken;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map