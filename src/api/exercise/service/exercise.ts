import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from '@api/exercise/schema';
import { PagingDto } from '@api/common/dto/paging';

@Injectable()
export class ExerciseService {
  constructor(@InjectModel(Exercise.name) private readonly exerciseModel: Model<ExerciseDocument>) {}

  async findMany(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.exerciseModel.countDocuments().exec();
    const data = await this.exerciseModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
}
