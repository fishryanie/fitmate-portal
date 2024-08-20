import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseCategories, ExerciseCategoriesSchema, ExerciseGoal, ExerciseGoalSchema, ExerciseSchema } from '@api/exercise/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }]),
    MongooseModule.forFeature([{ name: ExerciseGoal.name, schema: ExerciseGoalSchema }]),
    MongooseModule.forFeature([{ name: ExerciseCategories.name, schema: ExerciseCategoriesSchema }]),
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
