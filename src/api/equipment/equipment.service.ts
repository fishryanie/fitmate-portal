import { Model } from 'mongoose';
import { DATA_EQUIPMENT } from '#mock';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './schemas/equipment.schema';
import { PaginationDto } from './dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EquipmentService {
  constructor(@InjectModel(Equipment.name) private equipmentModel: Model<Equipment>) {}

  async createOne(equipment: Equipment): Promise<Equipment> {
    const newEquipment = new this.equipmentModel(equipment);
    return newEquipment.save();
  }

  async createMany(dataEquipment?: Equipment[]): Promise<Equipment[]> {
    try {
      return this.equipmentModel.insertMany(dataEquipment && dataEquipment.length ? dataEquipment : DATA_EQUIPMENT);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findMany(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const total = await this.equipmentModel.countDocuments().exec();
    const data = await this.equipmentModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
}
