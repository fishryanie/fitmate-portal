import { Controller, Get, Post, Body, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EquipmentService } from './equipment.service';
import { Equipment } from './schemas/equipment.schema';
import { PaginationDto } from './dto/pagination.dto';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Equipment' })
  @ApiResponse({ status: 200, description: 'List of equipment.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  findAll(@Query() pagingDto: PaginationDto) {
    return this.equipmentService.findMany(pagingDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Equipment' })
  @ApiResponse({ status: 201, description: 'Equipment created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('picture'))
  @ApiBody({ type: CreateEquipmentDto })
  create(@Body() createEquipmentDto: Equipment) {
    return this.equipmentService.createOne(createEquipmentDto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Import JSON DATA Equipment' })
  @ApiResponse({ status: 201, description: 'Equipment imported successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async importData(@Body() createEquipmentDto?: Equipment[]) {
    return this.equipmentService.createMany(createEquipmentDto);
  }
}
