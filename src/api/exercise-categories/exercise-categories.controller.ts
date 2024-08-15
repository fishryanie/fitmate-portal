import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '#api/equipment/dto/pagination.dto';
import { ExerciseCategoriesDocument } from './exercise-categories.schema';
import { ExerciseCategoriesService } from './exercise-categories.service';

@ApiTags('exercise-categories')
@Controller('exercise-categories')
export class ExerciseCategoriesController {
  constructor(private readonly exerciseCategoriesService: ExerciseCategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercise categories' })
  @ApiResponse({ status: 200, description: 'List of exercise categories.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findAll(@Query() pagingDto: PaginationDto) {
    return this.exerciseCategoriesService.findMany(pagingDto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import JSON DATA exercise categories' })
  @ApiResponse({ status: 201, description: 'Exercise categories imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  importExerciseGoal(@Body() listExerciseGoal: ExerciseCategoriesDocument[]) {
    return this.exerciseCategoriesService.createMany(listExerciseGoal);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new exercise categories' })
  @ApiResponse({ status: 201, description: 'Exercise categories created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createExerciseGoal(@Body() dataExerciseGoal: ExerciseCategoriesDocument) {
    return this.exerciseCategoriesService.createOne(dataExerciseGoal);
  }
}
