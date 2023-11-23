"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorModule = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const instructor_controller_1 = require("./instructor.controller");
const prisma_service_1 = require("../prismaService/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let InstructorModule = exports.InstructorModule = class InstructorModule {
};
exports.InstructorModule = InstructorModule = __decorate([
    (0, common_1.Module)({
        providers: [instructor_service_1.InstructorService, prisma_service_1.PrismaService, jwt_1.JwtService],
        controllers: [instructor_controller_1.InstructorController],
    })
], InstructorModule);
//# sourceMappingURL=instructor.module.js.map