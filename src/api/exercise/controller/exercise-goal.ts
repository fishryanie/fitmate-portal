import { PagingDto } from '@api/common/dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ExerciseGoalDocument } from '@api/exercise/schema';
import { ExerciseGoalService } from '@api/exercise/service';
import { ArrayExerciseCategoriesDto } from '@api/exercise/dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('exercise-goal')
@Controller('exercise-goal')
export class ExerciseGoalController {
  constructor(private readonly service: ExerciseGoalService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercise goal' })
  @ApiResponse({ status: 200, description: 'List of exercise goal.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findMany(@Query() pagingDto: PagingDto) {
    return this.service.findMany(pagingDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exercise goal by ID' })
  @ApiResponse({ status: 200, description: 'Exercise goal.' })
  @ApiResponse({ status: 404, description: 'Exercise goal not found' })
  @ApiParam({ name: 'id', type: 'string', description: 'Exercise goal ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new exercise goal' })
  @ApiResponse({ status: 201, description: 'Exercise goal created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() dataExerciseGoal: ExerciseGoalDocument) {
    return this.service.create(dataExerciseGoal);
  }

  @Post('create-many')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('arrayExerciseGoal'))
  @ApiOperation({ summary: 'Import JSON DATA exercise goal' })
  @ApiResponse({ status: 201, description: 'Exercise goal imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ description: 'Array of exercise goal to be created', type: ArrayExerciseCategoriesDto })
  createMany(@Body() { arrayExerciseCategories }: ArrayExerciseCategoriesDto) {
    return this.service.createMany(arrayExerciseCategories);
  }
}
