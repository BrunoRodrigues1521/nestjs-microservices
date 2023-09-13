import { ValidationService } from './services/validation.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from './repository/app.repository';
import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { LoggerService } from './services/logger.service';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios';
import { StudentCourseEditionService } from './services/studentCourseEdition.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACADEMIC_RECORDS_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'academicRecords',
            brokers: ['107.23.7.83:9092'],
          },
          consumer: {
            groupId: 'academicRecords-consumer',
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'COURSE_EDITION_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'courseEdition',
            brokers: ['107.23.7.83:9092'],
          },
          consumer: {
            groupId: 'courseEdition-consumer',
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'DEGREE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'degree',
            brokers: ['107.23.7.83:9092'],
          },
          consumer: {
            groupId: 'degree-consumer',
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
    HttpModule,
    HealthModule,
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    PrismaService,
    ValidationService,
    LoggerService,
    StudentCourseEditionService,
  ],
})
export class AppModule { }
