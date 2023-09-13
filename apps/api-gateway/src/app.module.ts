import {
  DiskHealthIndicator,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { StudentsService } from './services/students.service';
import { StudentsController } from './controllers/students.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AcademicRecordsController } from './controllers/academicRecords.controller';
import { AcademiRecordsService } from './services/academicRecords.service';
import { LoggerService } from './services/logger.service';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';

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
    ClientsModule.register([
      {
        name: 'ACADEMIC_RECORDS_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'academic-records',
            brokers: ['107.23.7.83:9092'],
          },
          consumer: {
            groupId: 'academic-records-consumer',
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'AUDIT_LOG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'audit-log',
            brokers: ['107.23.7.83:9092'],
          },
          consumer: {
            groupId: 'audit-log-consumer',
          },
        },
      },
    ]),
    HealthModule,
  ],
  controllers: [StudentsController, AcademicRecordsController],
  providers: [StudentsService, AcademiRecordsService, LoggerService],
})
export class AppModule { }
