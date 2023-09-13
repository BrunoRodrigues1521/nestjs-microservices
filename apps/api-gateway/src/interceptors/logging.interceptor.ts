
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from 'src/services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const value = context.switchToHttp().getRequest();
    const log = {
      id: 'API-GATEWAY',
      method: context.getHandler().name,
      http_method: value.method,
      origin: value.ip,
      payload: {
        body: value.body,
        params: value.params,
        query: value.query,
      },
      headers: value.headers,
      url: value.url,
      timestamp: Date.now(),
    };
    this.loggerService.logEvent(log);
    return next.handle();
  }
}
