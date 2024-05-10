import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schema';
import { RestaurantEntity } from './entity';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';
import { COLLECTION_NAME } from '#constant';

@Injectable()
export class RestaurantService {
  constructor(@InjectModel(COLLECTION_NAME.restaurant) private readonly restaurantModel: Model<RestaurantDocument>) {}
  async create(createEmployeeDto: RestaurantEntity): Promise<RestaurantDocument> {
    const employee = new this.restaurantModel(createEmployeeDto);
    return employee.save();
  }

  async findAll() {
    const result = await this.restaurantModel.find();
    return {
      success: true,
      message: 'success',
      data: result,
    };
  }

  async findOne(id: string) {
    return this.restaurantModel.findById(id);
  }

  async update(id: string, updateEmployeeDto: RestaurantEntity): Promise<RestaurantDocument> {
    return this.restaurantModel.findByIdAndUpdate(id, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.restaurantModel.findByIdAndRemove(id);
  }
}
