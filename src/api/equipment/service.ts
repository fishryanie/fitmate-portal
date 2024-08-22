import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@base';

@Injectable()
export class EquipmentService extends BaseService<EquipmentDocument> {
  constructor(@InjectModel(Equipment.name) protected modal: Model<EquipmentDocument>) {
    super(modal);
  }
}
