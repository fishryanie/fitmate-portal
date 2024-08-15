import { PartialType } from '@nestjs/swagger';
import { CreateExerciseCategoryDto } from './create-exercise-category.dto';

export class UpdateExerciseCategoryDto extends PartialType(CreateExerciseCategoryDto) {}
