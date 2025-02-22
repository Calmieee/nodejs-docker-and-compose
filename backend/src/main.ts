import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ServerException } from './exceptions/constructor.exception';
import { ErrorCode } from './exceptions/error-constants.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ServerException(ErrorCode.ValidationError),
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
