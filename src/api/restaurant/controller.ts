import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from '@nestjs/common';
import { RestaurantService } from './service';
import { RestaurantEntity } from './entity';

@Controller('/api/v1/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createEmployeeDto: RestaurantEntity) {
    return this.restaurantService.create(createEmployeeDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Query('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Put()
  update(@Query('id') id: string, @Body() updateEmployeeDto: RestaurantEntity) {
    return this.restaurantService.update(id, updateEmployeeDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    console.log('🚀 ~ RestaurantController ~ remove ~ id:', id);
    return this.restaurantService.remove(id);
  }
}
