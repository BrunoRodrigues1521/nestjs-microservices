import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENTS_MICROSERVICE',
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
    ]),
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule { }
