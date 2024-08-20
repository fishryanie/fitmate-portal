import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise, ExerciseCategories, ExerciseCategoriesDocument, ExerciseGoal, ExerciseGoalDocument } from '@api/exercise/schema';
import { PagingDto } from '@api/common/dto/paging';
import { DATA_EXERCISE_GOAL } from '#mock';
import { ExerciseCategoryDto } from '@api/exercise/dto/categories';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private readonly exerciseModel: Model<Exercise>,
    @InjectModel(ExerciseGoal.name) private readonly exerciseGoalModel: Model<ExerciseGoal>,
    @InjectModel(ExerciseCategories.name) private readonly exerciseCategoriesModel: Model<ExerciseCategories>,
  ) {}

  async insertManyExerciseGoal(dataEquipment?: ExerciseGoalDocument[]) {
    return await this.exerciseGoalModel.insertMany(dataEquipment && dataEquipment.length ? dataEquipment : DATA_EXERCISE_GOAL);
  }

  async insertExerciseCategories(body: ExerciseCategoriesDocument): Promise<ExerciseGoalDocument> {
    const newEquipment = new this.exerciseCategoriesModel(body);
    return newEquipment.save();
  }

  async insertManyExerciseCategories(dataEquipment: ExerciseCategoryDto[]) {
    return await this.exerciseCategoriesModel.insertMany(dataEquipment);
  }

  async findManyExerciseCategories(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.exerciseCategoriesModel.countDocuments().exec();
    const data = await this.exerciseCategoriesModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }

  async findManyExerciseGoal(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.exerciseGoalModel.countDocuments().exec();
    const data = await this.exerciseGoalModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }

  async findManyExercise(pagingDto: PagingDto) {
    const { page = 1, limit = 10 } = pagingDto;
    const skip = (page - 1) * limit;
    const total = await this.exerciseModel.countDocuments().exec();
    const data = await this.exerciseModel.find().skip(skip).limit(limit).exec();
    return { data, total, page, limit };
  }
}
