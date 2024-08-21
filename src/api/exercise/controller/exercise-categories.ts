import { PagingDto } from '@api/common/dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ArrayExerciseCategoriesDto, ExerciseCategoryDto } from '@api/exercise/dto/categories';
import { ExerciseCategoriesDocument } from '@api/exercise/schema';
import { ExerciseCategoriesService } from '@api/exercise/service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@ApiTags('exercise-categories')
@Controller('exercise-categories')
export class ExerciseCategoriesController {
  constructor(private readonly service: ExerciseCategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercise categories' })
  @ApiResponse({ status: 200, description: 'List of exercise categories.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findMany(@Query() pagingDto: PagingDto) {
    return this.service.findMany(pagingDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exercise categories by ID' })
  @ApiResponse({ status: 200, description: 'Exercise Category.' })
  @ApiResponse({ status: 404, description: 'Exercise categories not found' })
  @ApiParam({ name: 'id', type: 'string', description: 'Exercise categories ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new exercise categories' })
  @ApiResponse({ status: 201, description: 'Exercise categories created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() dataExerciseGoal: ExerciseCategoriesDocument) {
    return this.service.create(dataExerciseGoal);
  }

  @Post('create-many')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Import JSON DATA exercise categories' })
  @ApiResponse({ status: 201, description: 'Exercise categories imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    description: 'Upload a file containing products in JSON format or send products as an array',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        exerciseCategoryList: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/ExerciseCategoryDto',
          },
          example: '[{"name": "Exercise 1", "description": "Description 1"}, {"title": "Exercise 2", "description": "Description 2"}]',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async createMany(@Body('exerciseCategoryList') exerciseCategoryList: string, @UploadedFile() file: Express.Multer.File) {
    let products: ExerciseCategoryDto[];

    if (file) {
      try {
        const jsonString = file.buffer.toString();
        products = JSON.parse(jsonString);
      } catch (error) {
        throw new BadRequestException('Invalid JSON file');
      }
    } else if (exerciseCategoryList) {
      try {
        products = JSON.parse(exerciseCategoryList);
      } catch (error) {
        throw new BadRequestException('Invalid JSON string');
      }
    } else {
      throw new BadRequestException('No valid data provided. Provide either a file or an array of products.');
    }
    // Validation logic to ensure all products comply with ExerciseCategoryDto
    // Validation logic to ensure all products comply with ExerciseCategoryDto
    for (const product of products) {
      // Chuyển đổi dữ liệu thô sang đối tượng thuộc lớp ExerciseCategoryDto
      const productInstance = plainToInstance(ExerciseCategoryDto, product);

      // Sử dụng validate để kiểm tra
      const errors = await validate(productInstance);

      if (errors.length > 0) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }
    }

    console.log('🚀 ~ ExerciseCategoriesController ~ createMany ~ products:', products);
  }
}
