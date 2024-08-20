import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ExerciseCategoryDto {
  @ApiProperty({ description: 'The title of the item', required: true, uniqueItems: true })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title should be a string' })
  title: string;
  @ApiProperty({ description: 'The value of the item' })
  description: string;
}

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
