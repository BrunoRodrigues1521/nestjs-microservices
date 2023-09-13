import { HealthModule } from './health/health.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AcademicRecordController } from './controllers/academicRecords.controller';
import { PrismaService } from './repository/app.repository';
import { AcademicRecordService } from './services/academicRecord.service';
import { LoggerService } from './services/logger.service';
import { ValidatorService } from 'src/services/validator.service';
import { HttpModule } from '@nestjs/axios';
import { ExamService } from './services/exams.service';

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
    HttpModule,
  ],
  controllers: [AcademicRecordController],
  providers: [AcademicRecordService, PrismaService, LoggerService, ValidatorService, ExamService],
})
export class AppModule { }
