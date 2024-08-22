import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Muscle, MuscleDocument } from '@api/muscle/schema';
import { BaseService } from '@base';

@Injectable()
export class MuscleService extends BaseService<MuscleDocument> {
  constructor(@InjectModel(Muscle.name) readonly model: Model<MuscleDocument>) {
    super(model);
  }
}
