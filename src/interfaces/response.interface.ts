import { HttpStatus } from '@nestjs/common';

export interface ApiResponse {
  code: HttpStatus;
  message: string;
}

export interface ResponseData<D> extends ApiResponse {
  data: D;
}
