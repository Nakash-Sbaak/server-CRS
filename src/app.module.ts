import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule,
    StudentModule,
    AuthModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
