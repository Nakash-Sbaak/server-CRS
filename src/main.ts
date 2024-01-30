import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new I18nValidationPipe());
  // to validate inputs
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
