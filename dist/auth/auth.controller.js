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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const CreateStudent_dto_1 = require("./dto/CreateStudent.dto");
const serialize_interceptor_1 = require("../student/Interceptor/serialize.interceptor");
const Student_dto_1 = require("./dto/Student.dto");
const SignIn_dto_1 = require("./dto/SignIn.dto");
const auth_guard_1 = require("./guard/auth.guard");
const role_enum_1 = require("./decorator/role.enum");
const role_guard_1 = require("./guard/role.guard");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async StudentSignup(newStudent) {
        return await this.authService.StudentSignUp(newStudent);
    }
    async StudentSignin(body) {
        return await this.authService.StudentSignIn(body.email, body.password);
    }
    async InstructorSignin(body) {
        return await this.authService.InstructorSignIn(body.email, body.password);
    }
    async testJwt() {
        console.log('success');
    }
};
__decorate([
    (0, common_1.Put)('/student/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStudent_dto_1.SignUpStudentDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "StudentSignup", null);
__decorate([
    (0, common_1.Post)('/student/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignIn_dto_1.SignIn]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "StudentSignin", null);
__decorate([
    (0, common_1.Post)('/instructor/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignIn_dto_1.SignIn]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "InstructorSignin", null);
__decorate([
    (0, common_1.Post)('/test'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, new role_guard_1.RoleGuard(role_enum_1.Role.Student)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testJwt", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, serialize_interceptor_1.Serialize)(Student_dto_1.StudentDTO),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map