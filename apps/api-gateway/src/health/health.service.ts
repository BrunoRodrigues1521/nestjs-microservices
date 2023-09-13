import Topics from 'src/enums/topics.enum';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, Transport } from '@nestjs/microservices';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    @Inject('STUDENTS_MICROSERVICE')
    private readonly client: ClientKafka,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) { }

  async getHealth() {
    const gatewayHealth = await this.getSelfHealth();
    const studentHealth = await this.client
      .send(Topics.STUDENT_HEALTH_CHECK, {})
      .toPromise();
    const academicRecordsHealth = await this.client
      .send(Topics.ACADEMIC_RECORDS_HEALTH_CHECK, {})
      .toPromise();
    const auditLogHealth = await this.client
      .send(Topics.AUDIT_LOGS_HEALTH_CHECK, {})
      .toPromise();
    return {
      gatewayHealth: gatewayHealth,
      studentMicroservice: studentHealth,
      academicRecordsMicroservice: academicRecordsHealth,
      auditLogMicroservice: auditLogHealth,
    };
  }

  getSelfHealth() {
    return this.health.check([
      () => this.http.pingCheck('http_req', 'https://google.com'),
      () =>
        this.microservice.pingCheck('kafka', {
          timeout: 20000,
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'kafka-health',
              brokers: ['107.23.7.83:9092'],
            },
          },
        }),
      () =>
        this.disk.checkStorage('diskStorage', {
          thresholdPercent: 0.99,
          path: '/',
        }),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }

  onModuleInit() {
    this.client.subscribeToResponseOf(Topics.STUDENT_HEALTH_CHECK);
    this.client.subscribeToResponseOf(Topics.ACADEMIC_RECORDS_HEALTH_CHECK);
    this.client.subscribeToResponseOf(Topics.AUDIT_LOGS_HEALTH_CHECK);
  }
}
