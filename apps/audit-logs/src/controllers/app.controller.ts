import Topics from 'src/enums/topics.enum';
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from '../services/app.service';
import { Log } from '@prisma/client';
import { LogMessageDto } from 'src/dto/messages/log.message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(Topics.AUDIT_LOGS_GET)
  saveAuditLog(data: LogMessageDto): Promise<Log> {
    return this.appService.saveAuditLog(data.message);
  }
}
