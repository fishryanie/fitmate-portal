import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schema';
import { TaskEntity } from './entity';
import { COLLECTION_NAME } from '#constant';

@Injectable()
export class TaskService {
  constructor(@InjectModel(COLLECTION_NAME.task) private readonly taskModel: Model<TaskDocument>) {}
  async create(createEmployeeDto: TaskEntity): Promise<TaskDocument> {
    const employee = new this.taskModel(createEmployeeDto);
    return employee.save();
  }

  async findAll(restaurant: string[], isRefunded: boolean, keyword: string) {
    let query: any = {};
    if (keyword) {
      query = { ...query, title: { $regex: new RegExp('.*' + keyword, 'i') } };
    }
    if (restaurant?.length) {
      query = { ...query, restaurant: { $in: restaurant } };
    }
    if (isRefunded) {
      query = { ...query, isRefunded };
    }
    const result = await this.taskModel.find(query).populate('restaurant').exec();
    return {
      success: true,
      message: 'success',
      data: result,
    };
  }

  async findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async update(id: string, updateEmployeeDto: TaskEntity): Promise<TaskDocument> {
    return this.taskModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });
  }

  async updateRefunded(idTask: string): Promise<TaskDocument> {
    return this.taskModel.findOneAndUpdate({ _id: idTask }, { isRefunded: true }, { new: true });
  }

  async remove(id: string) {
    return this.taskModel.findByIdAndRemove(id);
  }
}
