import { PagingDto } from '@api/common/dto';
import { ExerciseService } from '@api/exercise/service/exercise';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercise' })
  @ApiResponse({ status: 200, description: 'List of exercise.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findManyExercise(@Query() pagingDto: PagingDto) {
    return this.exerciseService.findMany(pagingDto);
  }
}
