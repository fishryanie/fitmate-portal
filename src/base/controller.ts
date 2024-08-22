import { PagingDto } from '@api/common/dto';
import { Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export abstract class BaseController<T> {
  constructor(readonly service: T) {}

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'List of items.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findMany(@Query() pagingDto: PagingDto) {
    return this.service['findMany'](pagingDto);
  }
}
