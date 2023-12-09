import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CustomI18Service } from 'src/custom-i18n.service';


@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService,CustomI18Service],
})
export class AuthModule {}
