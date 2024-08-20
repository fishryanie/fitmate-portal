import { Controller, Get, Post, Body, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MuscleService } from './muscle.service';
import { MuscleDocument } from './muscle.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { PagingDto } from '@api/common/dto';
import { PasswordSwagger, PasswordSwaggerGuard } from '@guards';

@ApiTags('muscle')
@Controller('muscle')
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all muscle' })
  @ApiResponse({ status: 200, description: 'List of muscle.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findAll(@Query() pagingDto: PagingDto) {
    return this.muscleService.findMany(pagingDto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import json data muscle' })
  @ApiResponse({ status: 201, description: 'Muscle imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiHeader({ name: 'x-password', description: 'Password required to access this endpoint', required: true })
  @UseGuards(PasswordSwaggerGuard)
  @PasswordSwagger('x-password')
  importMuscle(@Body() listMuscle: MuscleDocument[]) {
    return this.muscleService.createMany(listMuscle);
  }

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiOperation({ summary: 'Create a new muscle' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Create muscle group', type: CreateMuscleDto })
  @ApiResponse({ status: 201, description: 'Muscle created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createMuscle(@Body() dataMuscle: MuscleDocument) {
    return this.muscleService.createOne(dataMuscle);
  }
}
