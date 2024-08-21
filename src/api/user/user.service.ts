import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateConditionDto } from './dto/condition.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { ApiResponseData } from 'interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateCondition(userId: string, updateConditionDto: UpdateConditionDto): Promise<ApiResponseData<UpdateConditionDto>> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { $set: { condition: updateConditionDto } }, { new: true, useFindAndModify: false })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return {
      statusCode: HttpStatus.CREATED,
      data: updatedUser.condition,
      message: 'Update success',
    };
  }
}
