import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const value = context.getArgs();
    const log = {
      id: 'ACADEMIC-RECORDS-MICROSERVICE',
      method: context.getHandler().name,
      payload: value[0],
      kafka: {
        topic: value[1].args[0].topic,
        partition: value[1].args[0].partition,
        timestamp: value[1].args[0].timestamp,
        headers: value[1].args[0].headers,
      },
    };
    this.loggerService.logEvent(log);
    return next.handle();
  }
}
