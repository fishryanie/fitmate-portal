import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PagingDto } from '#api/common/dto/paging.dto';
import { ExerciseCategories, ExerciseCategoriesDocument } from './exercise-categories.schema';
import { DATA_EXERCISE_CATEGORIES } from '#mock';

@Injectable()
export class ExerciseCategoriesService {
  constructor(@InjectModel(ExerciseCategories.name) private exerciseCategoriesModel: Model<ExerciseCategories>) {}

  async createMany(dataEquipment?: ExerciseCategoriesDocument[]) {
    return await this.exerciseCategoriesModel.insertMany(dataEquipment && dataEquipment.length ? dataEquipment : DATA_EXERCISE_CATEGORIES);
  }

  async createOne(equipment: ExerciseCategoriesDocument): Promise<ExerciseCategoriesDocument> {
    const newEquipment = new this.exerciseCategoriesModel(equipment);
    return newEquipment.save();
  }

  async findMany(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.exerciseCategoriesModel.countDocuments().exec();
    const data = await this.exerciseCategoriesModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
}
