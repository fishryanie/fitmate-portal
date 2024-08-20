import { PagingDto } from '@api/common/dto';
import { ArrayExerciseCategoriesDto } from '@api/exercise/dto/categories';
import { ExerciseService } from '@api/exercise/exercise.service';
import { ExerciseCategoriesDocument, ExerciseGoalDocument } from '@api/exercise/schema';
import { PasswordSwagger, PasswordSwaggerGuard } from '@guards';
import { Body, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('categories/create-many')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('arrayExerciseCategories'))
  @ApiOperation({ summary: 'Import JSON DATA exercise categories' })
  @ApiResponse({ status: 201, description: 'Exercise categories imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ description: 'Array of exercise categories to be created', type: ArrayExerciseCategoriesDto })
  insertManyExerciseCategories(@Body() { arrayExerciseCategories }: ArrayExerciseCategoriesDto) {
    return this.exerciseService.insertManyExerciseCategories(arrayExerciseCategories);
  }

  @Post('categories/create')
  @ApiOperation({ summary: 'Create a new exercise categories' })
  @ApiResponse({ status: 201, description: 'Exercise categories created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  insertExerciseCategories(@Body() dataExerciseGoal: ExerciseCategoriesDocument) {
    return this.exerciseService.insertExerciseCategories(dataExerciseGoal);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all exercise categories' })
  @ApiResponse({ status: 200, description: 'List of exercise categories.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findManyExerciseCategories(@Query() pagingDto: PagingDto) {
    return this.exerciseService.findManyExerciseCategories(pagingDto);
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get exercise categories by ID' })
  @ApiResponse({ status: 200, description: 'Exercise Category.' })
  @ApiResponse({ status: 404, description: 'Exercise categories not found' })
  @ApiParam({ name: 'id', type: 'string', description: 'Exercise categories ID' })
  findExerciseCategoryById(@Param('id') id: string) {
    console.log('🚀 ~ ExerciseController ~ findExerciseCategoryById ~ id:', id);
    // return this.exerciseService.findManyExerciseCategories(pagingDto);
  }

  @Get('goal')
  @ApiOperation({ summary: 'Get all exercise goal' })
  @ApiResponse({ status: 200, description: 'List of exercise goal.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findManyExerciseGoal(@Query() pagingDto: PagingDto) {
    return this.exerciseService.findManyExerciseGoal(pagingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exercise' })
  @ApiResponse({ status: 200, description: 'List of exercise.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findManyExercise(@Query() pagingDto: PagingDto) {
    return this.exerciseService.findManyExercise(pagingDto);
  }

  @Post('goal-insert-list')
  @ApiOperation({ summary: 'Import JSON DATA exercise goal' })
  @ApiResponse({ status: 201, description: 'Exercise goal imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiHeader({ name: 'x-password', description: 'Password required to access this endpoint', required: true })
  @UseGuards(PasswordSwaggerGuard)
  @PasswordSwagger('x-password')
  insertManyExerciseGoal(@Body() listExerciseGoal: ExerciseGoalDocument[]) {
    return this.exerciseService.insertManyExerciseGoal(listExerciseGoal);
  }

  @Post('goal-insert')
  @ApiOperation({ summary: 'Create a new exercise goal' })
  @ApiResponse({ status: 201, description: 'Exercise goal created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createExerciseGoal(@Body() dataExerciseGoal: ExerciseGoalDocument) {
    return this.exerciseService.insertExerciseCategories(dataExerciseGoal);
  }
}
