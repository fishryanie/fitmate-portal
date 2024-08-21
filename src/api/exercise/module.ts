import { Module } from '@nestjs/common';
import { ExerciseService } from './service/exercise';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseCategories, ExerciseCategoriesSchema, ExerciseGoal, ExerciseGoalSchema, ExerciseSchema } from '@api/exercise/schema';
import { ExerciseCategoriesController, ExerciseController, ExerciseGoalController } from '@api/exercise/controller';
import { ExerciseCategoriesService, ExerciseGoalService } from '@api/exercise/service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }]),
    MongooseModule.forFeature([{ name: ExerciseGoal.name, schema: ExerciseGoalSchema }]),
    MongooseModule.forFeature([{ name: ExerciseCategories.name, schema: ExerciseCategoriesSchema }]),
  ],
  controllers: [ExerciseController, ExerciseGoalController, ExerciseCategoriesController],
  providers: [ExerciseService, ExerciseGoalService, ExerciseCategoriesService],
})
export class ExerciseModule {}
