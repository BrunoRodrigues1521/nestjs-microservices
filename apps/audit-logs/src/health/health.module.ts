import { PrismaService } from './../repository/app.repository';
import { PrismaOrmHealthIndicator } from './prismaOrmHealth.indicator';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [HealthService, PrismaOrmHealthIndicator, PrismaService],
})
export class HealthModule {}
