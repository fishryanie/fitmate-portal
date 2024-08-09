import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseGoal, ExerciseGoalDocument } from './schemas/equipment.schema';
import { DATA_EXERCISE_GOAL } from '#mock';
import { PagingDto } from '#api/common/dto/paging.dto';

@Injectable()
export class ExerciseGoalService {
  constructor(@InjectModel(ExerciseGoal.name) private exerciseGoalModel: Model<ExerciseGoal>) {}

  async createMany(dataEquipment?: ExerciseGoalDocument[]) {
    return await this.exerciseGoalModel.insertMany(dataEquipment && dataEquipment.length ? dataEquipment : DATA_EXERCISE_GOAL);
  }

  async createOne(equipment: ExerciseGoalDocument): Promise<ExerciseGoalDocument> {
    const newEquipment = new this.exerciseGoalModel(equipment);
    return newEquipment.save();
  }

  async findMany(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.exerciseGoalModel.countDocuments().exec();
    const data = await this.exerciseGoalModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
}
