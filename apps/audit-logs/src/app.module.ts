import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { HealthModule } from './health/health.module';
import { PrismaService } from './repository/app.repository';
import { AppService } from './services/app.service';

@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
