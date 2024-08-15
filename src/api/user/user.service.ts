import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateConditionDto } from './dto/condition.dto';
import { ResponseData } from 'interfaces/response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

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

  async updateCondition(userId: string, updateConditionDto: UpdateConditionDto): Promise<ResponseData<UpdateConditionDto>> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { $set: { condition: updateConditionDto } }, { new: true, useFindAndModify: false })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return {
      code: HttpStatus.CREATED,
      data: updatedUser.condition,
      message: 'Update success',
    };
  }
}
