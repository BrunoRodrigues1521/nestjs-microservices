import { ExceptionMessage } from 'src/types/exception';
import { EHttpStatus } from './../enums/httpStatus.enum';

export default class CustomExceptionMessage {
  statusCode: EHttpStatus;
  error: string;

  constructor(statusCode: EHttpStatus, error: string) {
    this.error = error;
    this.statusCode = statusCode;
  }

  toJSON(): ExceptionMessage {
    return {
      statusCode: this.statusCode,
      error: this.error,
    };
  }
}
