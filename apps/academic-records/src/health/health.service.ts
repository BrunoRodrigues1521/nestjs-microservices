import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Transport } from '@nestjs/microservices';
import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { PrismaOrmHealthIndicator } from './prismaOrmHealth.indicator';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    @Inject(PrismaOrmHealthIndicator)
    private db: PrismaOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) { }

  async checkHealth(): Promise<HealthCheckResult> {
    return await this.health.check([
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
          thresholdPercent: 0.9,
          path: '/',
        }),
      () => this.db.pingCheck('db_connection'),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }
}
