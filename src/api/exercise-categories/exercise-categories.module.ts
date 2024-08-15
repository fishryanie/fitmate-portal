import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseCategoriesService } from './exercise-categories.service';
import { ExerciseCategoriesController } from './exercise-categories.controller';
import { ExerciseCategories, ExerciseCategoriesSchema } from './exercise-categories.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExerciseCategories.name, schema: ExerciseCategoriesSchema }])],
  controllers: [ExerciseCategoriesController],
  providers: [ExerciseCategoriesService],
})
export class ExerciseCategoriesModule {}
