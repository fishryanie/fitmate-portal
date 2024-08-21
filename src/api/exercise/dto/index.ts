import { ExerciseCategoryDto } from '@api/exercise/dto/categories';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class ArrayExerciseCategoriesDto {
  @ApiProperty({
    type: [ExerciseCategoryDto],
    description: 'Array of exercise categories',
  })
  @IsArray({ message: 'arrayExerciseCategories must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ExerciseCategoryDto)
  arrayExerciseCategories: ExerciseCategoryDto[];
}
