import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ServerException } from './exceptions/constructor.exception';
import { ErrorCode } from './exceptions/error-constants.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  // console.log(router.stack.map((layer) => layer.route?.path).filter(Boolean));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ServerException(ErrorCode.ValidationError),
    }),
  );
  app.enableCors();
  await app.listen(3001, '0.0.0.0');
}
bootstrap();