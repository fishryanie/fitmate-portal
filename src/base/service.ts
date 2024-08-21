import { PagingDto } from '@api/common/dto';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ApiPagingResponseData, ApiResponseData } from 'interfaces';
import { Model } from 'mongoose';

export abstract class BaseService<T> {
  constructor(protected readonly model: Model<T>) {}

  async findMany(pagingDto: PagingDto): Promise<ApiPagingResponseData<T>> {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const data = await this.model.find().skip(skip).limit(limit).exec();
    const total = await this.model.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages, page, limit, statusCode: HttpStatus.OK, message: 'successfully' };
  }

  async findById(id: string): Promise<ApiResponseData<T>> {
    const data = await this.model.findById(id).exec();
    if (!data) {
      throw new NotFoundException(`Exercise categories with id ${id} not found`);
    }
    return { data, statusCode: HttpStatus.OK, message: 'successfully' };
  }
}
