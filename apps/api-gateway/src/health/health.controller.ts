import { HealthService } from './health.service';
import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  async getHealth() {
    return this.healthService.getHealth();
  }

  @Get('/health/gateway')
  async getGatewayHealth() {
    try {
      return await this.healthService.getSelfHealth();
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        return error.getResponse();
      }
    }
  }
}
