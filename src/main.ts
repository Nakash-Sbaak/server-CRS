import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomHttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Custom exception filter
  app.useGlobalFilters(new CustomHttpExceptionFilter());
  // to validate inputs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
