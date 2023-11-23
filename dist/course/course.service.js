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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prismaService/prisma.service");
let CourseService = exports.CourseService = class CourseService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createCourse(course) {
        try {
            const existingCourse = await this.prismaService.course.findUnique({
                where: { course_code: course.course_code },
            });
            if (existingCourse) {
                throw new common_1.HttpException('Course code must be unique', common_1.HttpStatus.CONFLICT);
            }
            if (!(await this.checkInstructorExistence(course.instructor_id))) {
                throw new common_1.HttpException('Instructor not found', common_1.HttpStatus.NOT_FOUND);
            }
            const newCourse = await this.prismaService.course.create({
                data: {
                    course_code: course.course_code,
                    name: course.name,
                    instructor_id: course.instructor_id,
                    type: course.type,
                    credits: course.credits,
                },
                select: {
                    course_code: true,
                    name: true,
                    credits: true,
                    type: true,
                    instructor: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return newCourse;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllCourses() {
        try {
            const allCoursesWithPrerequisites = await this.prismaService.course.findMany({
                select: {
                    course_code: true,
                    name: true,
                    credits: true,
                    type: true,
                    instructor: {
                        select: {
                            name: true,
                        },
                    },
                    courses: {
                        select: {
                            course_id: false,
                            course_prerequisites_id: false,
                            course_prerequisites: {
                                select: {
                                    course_code: true,
                                    name: true,
                                    credits: true,
                                    type: true,
                                    instructor: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            return allCoursesWithPrerequisites;
        }
        catch (error) {
            throw error;
        }
    }
    async updateCourse(code, attr) {
        try {
            if (!(await this.checkCourseExistence(code))) {
                throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
            }
            const updatedCourse = await this.prismaService.course.update({
                where: { course_code: code },
                data: {
                    name: attr.name,
                    credits: attr.credits,
                    type: attr.type,
                    instructor_id: attr.instructor_id,
                },
                select: {
                    course_code: true,
                    name: true,
                    credits: true,
                    type: true,
                    instructor: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return updatedCourse;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCourse(code) {
        try {
            if (!(await this.checkCourseExistence(code))) {
                throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.prismaService.course.delete({
                where: {
                    course_code: code,
                },
            });
            return 'course deleted successfully';
        }
        catch (error) {
            throw error;
        }
    }
    async checkInstructorExistence(id) {
        try {
            const existingInstructor = await this.prismaService.instructor.findUnique({
                where: { instructor_id: id },
            });
            return existingInstructor ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async checkCourseExistence(code) {
        try {
            const existingCourse = await this.prismaService.course.findUnique({
                where: { course_code: code },
            });
            return existingCourse ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map