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
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
const role_guard_1 = require("../auth/guard/role.guard");
const role_enum_1 = require("../auth/enums/role.enum");
const serialize_interceptor_1 = require("../Interceptor/serialize.interceptor");
const instructor_dto_1 = require("./dto/instructor.dto");
let InstructorController = exports.InstructorController = class InstructorController {
    constructor(instructorService) {
        this.instructorService = instructorService;
    }
    async getALl() {
        return await this.instructorService.getAll();
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, new role_guard_1.RoleGuard(role_enum_1.Role.Instructor)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getALl", null);
exports.InstructorController = InstructorController = __decorate([
    (0, common_1.Controller)('instructor'),
    (0, serialize_interceptor_1.Serialize)(instructor_dto_1.InstructorSerializer),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService])
], InstructorController);
//# sourceMappingURL=instructor.controller.js.map