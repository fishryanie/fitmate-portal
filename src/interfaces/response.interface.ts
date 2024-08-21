import { HttpStatus } from '@nestjs/common';

export interface ApiResponse {
  message: string;
  statusCode: HttpStatus;
}

export interface ApiResponseData<D> extends ApiResponse {
  data: D;
}

export interface ApiPagingResponseData<D> extends ApiResponse {
  limit: number;
  total: number;
  page: number;
  totalPages: number;
  data: D[];
}
