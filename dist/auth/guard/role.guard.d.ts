import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RoleGuard implements CanActivate {
    private readonly permeationRole;
    constructor(permeationRole: string);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
