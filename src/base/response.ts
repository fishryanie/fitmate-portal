import { HttpStatus } from '@nestjs/common';
import { ApiResponseData } from 'interfaces';

export class BaseResponse<D> implements ApiResponseData<D> {
  readonly data: D;
  readonly message: string;
  readonly statusCode: HttpStatus;
  constructor(data: D, statusCode: HttpStatus = HttpStatus.OK, message = 'Successfully') {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
