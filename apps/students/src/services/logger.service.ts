import Topics from 'src/enums/topics.enum';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('AUDIT_LOG_MICROSERVICE')
    private readonly client: ClientKafka,
  ) {}

  logEvent(data: any): Observable<any> {
    return this.client.emit(Topics.AUDIT_LOGS_GET, {
      message: JSON.stringify(data),
    });
  }
}
