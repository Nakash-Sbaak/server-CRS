import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly permeationRole: string) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (this.permeationRole !== request.role) {
      throw new UnauthorizedException("you don't have permeation");
    }

    return true;
  }
}

