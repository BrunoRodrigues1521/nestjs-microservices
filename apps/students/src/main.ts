import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './interceptors/interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'students',
          brokers: ['107.23.7.83:9092'],
        },
        consumer: {
          groupId: 'students-consumer',
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen();
  Logger.log('🚀 Students Microservice is listening... 🚀');
}
bootstrap();
