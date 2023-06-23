import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDto } from './exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel('Exercise')
    private readonly exerciseModel: Model<CreateExerciseDto>,
  ) {}
  async findAll(): Promise<CreateExerciseDto[]> {
    return this.exerciseModel.find().exec();
  }
  async create(
    createExerciseDto: CreateExerciseDto,
  ): Promise<CreateExerciseDto> {
    const createdExercise = new this.exerciseModel(createExerciseDto);
    return createdExercise.save();
  }
}
