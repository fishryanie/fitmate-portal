import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATA_EXERCISE_GOAL } from '#mock';
import { PagingDto } from '#api/common/dto/paging.dto';
import { Muscle, MuscleDocument } from './muscle.schema';

@Injectable()
export class MuscleService {
  constructor(@InjectModel(Muscle.name) private muscleModel: Model<Muscle>) {}

  async createMany(dataEquipment?: MuscleDocument[]) {
    return await this.muscleModel.insertMany(dataEquipment && dataEquipment.length ? dataEquipment : DATA_EXERCISE_GOAL);
  }

  async createOne(equipment: MuscleDocument): Promise<MuscleDocument> {
    const newEquipment = new this.muscleModel(equipment);
    return newEquipment.save();
  }

  async findMany(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.muscleModel.countDocuments().exec();
    const data = await this.muscleModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
}
