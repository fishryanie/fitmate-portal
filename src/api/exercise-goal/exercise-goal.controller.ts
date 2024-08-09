import { Controller, Get, Post, Body, Query, Headers, UseGuards } from '@nestjs/common';
import { ExerciseGoalService } from './exercise-goal.service';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '#api/equipment/dto/pagination.dto';
import { ExerciseGoalDocument } from './schemas/equipment.schema';
import { Password, PasswordGuard } from '#api/common/guards/password.guard';

@ApiTags('exercise-goal')
@Controller('exercise-goal')
export class ExerciseGoalController {
  constructor(private readonly exerciseGoalService: ExerciseGoalService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercise goal' })
  @ApiResponse({ status: 200, description: 'List of exercise goal.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findAll(@Query() pagingDto: PaginationDto) {
    return this.exerciseGoalService.findMany(pagingDto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import JSON DATA exercise goal' })
  @ApiResponse({ status: 201, description: 'Exercise goal imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiHeader({ name: 'x-password', description: 'Password required to access this endpoint', required: true })
  @UseGuards(PasswordGuard)
  @Password('x-password')
  importExerciseGoal(@Body() listExerciseGoal: ExerciseGoalDocument[]) {
    return this.exerciseGoalService.createMany(listExerciseGoal);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new exercise goal' })
  @ApiResponse({ status: 201, description: 'Exercise goal created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createExerciseGoal(@Body() dataExerciseGoal: ExerciseGoalDocument) {
    return this.exerciseGoalService.createOne(dataExerciseGoal);
  }
}
