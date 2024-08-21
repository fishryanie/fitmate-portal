import { FilterQuery, Model } from 'mongoose';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseCategories, ExerciseCategoriesDocument } from '@api/exercise/schema';
import { ExerciseCategoryDto } from '@api/exercise/dto/categories';
import { PagingDto } from '@api/common/dto/paging';
import { ApiPagingResponseData, ApiResponseData } from 'interfaces';
import { BaseService } from '@base';

@Injectable()
export class ExerciseCategoriesService extends BaseService<ExerciseCategoriesDocument> {
  constructor(@InjectModel(ExerciseCategories.name) readonly model: Model<ExerciseCategoriesDocument>) {
    super(model);
  }

  async create(body: ExerciseCategoriesDocument): Promise<ApiResponseData<ExerciseCategoriesDocument>> {
    const newEquipment = new this.model(body);
    const data = await newEquipment.save();
    return { data, statusCode: HttpStatus.CREATED, message: 'successfully' };
  }

  async createMany(dataEquipment: ExerciseCategoryDto[]) {
    return await this.model.insertMany(dataEquipment);
  }

  async findOneQuery(query: FilterQuery<ExerciseCategoriesDocument>): Promise<ApiResponseData<ExerciseCategoriesDocument>> {
    const data = await this.model.findOne(query).exec();
    if (!data) {
      throw new NotFoundException(`Exercise categories not found with the given criteria`);
    }
    return { data, statusCode: HttpStatus.OK, message: 'successfully' };
  }
}
