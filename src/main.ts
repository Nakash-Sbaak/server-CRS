import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new CustomHttpExceptionFilter());

  app.useGlobalPipes(new I18nValidationPipe());
  //Custom exception filter
  // to validate inputs
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
