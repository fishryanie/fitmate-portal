import { PartialType } from '@nestjs/swagger';
import { CreateExerciseGoalDto } from './create-exercise-goal.dto';

export class UpdateExerciseGoalDto extends PartialType(CreateExerciseGoalDto) {}
