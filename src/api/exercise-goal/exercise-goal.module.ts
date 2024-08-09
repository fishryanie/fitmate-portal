import { Module } from '@nestjs/common';
import { ExerciseGoalService } from './exercise-goal.service';
import { ExerciseGoalController } from './exercise-goal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseGoal, ExerciseGoalSchema } from './schemas/equipment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExerciseGoal.name, schema: ExerciseGoalSchema }])],
  controllers: [ExerciseGoalController],
  providers: [ExerciseGoalService],
})
export class ExerciseGoalModule {}
