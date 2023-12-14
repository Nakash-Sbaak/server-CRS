import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { MailModule } from './mail/mail.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    I18nModule.forRoot({
      fallbackLanguage:"ar",
      loaderOptions:{
        path:path.join(__dirname,'/i18n/'),
        watch:true
      },
      resolvers:[
        AcceptLanguageResolver
      ]
    }),
    StudentModule,
    AuthModule,
    CourseModule,
    InstructorModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
