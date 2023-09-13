import { SuccessMessage } from 'src/types/success';
import { EHttpStatus } from './../../enums/httpStatus.enum';
export default class CustomSuccessMessage {
  statusCode: EHttpStatus;
  message: string;

  constructor(statusCode: EHttpStatus, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON(): SuccessMessage {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
