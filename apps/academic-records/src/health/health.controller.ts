import Topics from 'src/enums/topics.enum';
import { MessagePattern } from '@nestjs/microservices';
import {
  Inject,
  ServiceUnavailableException,
  Controller,
} from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @MessagePattern(Topics.ACADEMIC_RECORDS_HEALTH_CHECK)
  @HealthCheck()
  async check(): Promise<any> {
    try {
      return await this.healthService.checkHealth();
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        return error.getResponse();
      }
    }
  }
}
