import { FilterQuery, Model } from 'mongoose';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseGoal, ExerciseGoalDocument } from '@api/exercise/schema';
import { PagingDto } from '@api/common/dto/paging';
import { ApiPagingResponseData, ApiResponseData } from 'interfaces';
import { ExerciseCategoryDto } from '@api/exercise/dto/categories';

@Injectable()
export class ExerciseGoalService {
  constructor(@InjectModel(ExerciseGoal.name) private readonly model: Model<ExerciseGoalDocument>) {}

  async create(body: ExerciseGoalDocument): Promise<ApiResponseData<ExerciseGoalDocument>> {
    const newEquipment = new this.model(body);
    const data = await newEquipment.save();
    return { data, statusCode: HttpStatus.CREATED, message: 'successfully' };
  }

  async createMany(dataEquipment: ExerciseCategoryDto[]) {
    return await this.model.insertMany(dataEquipment);
  }

  async findById(id: string): Promise<ApiResponseData<ExerciseGoalDocument>> {
    const data = await this.model.findById(id).exec();
    if (!data) {
      throw new NotFoundException(`Exercise Goal with id ${id} not found`);
    }
    return { data, statusCode: HttpStatus.OK, message: 'successfully' };
  }

  async findOneQuery(query: FilterQuery<ExerciseGoalDocument>): Promise<ApiResponseData<ExerciseGoalDocument>> {
    const data = await this.model.findOne(query).exec();
    if (!data) {
      throw new NotFoundException(`Exercise Goal not found with the given criteria`);
    }
    return { data, statusCode: HttpStatus.OK, message: 'successfully' };
  }

  async findMany(pagingDto: PagingDto): Promise<ApiPagingResponseData<ExerciseGoalDocument>> {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const data = await this.model.find().skip(skip).limit(limit).exec();
    const total = await this.model.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages, page, limit, statusCode: HttpStatus.OK, message: 'successfully' };
  }
}
