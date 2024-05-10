import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './service';
import { TaskEntity } from './entity';

@Controller('/api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createEmployeeDto: TaskEntity) {
    return this.taskService.create(createEmployeeDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('restaurant') restaurant: string[], @Query('isRefunded') isRefunded: boolean, @Query('keyword') keyword: string) {
    return this.taskService.findAll(restaurant, isRefunded, keyword);
  }

  @Get(':id')
  findOne(@Query('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Put()
  update(@Query('id') id: string, @Body() updateEmployeeDto: TaskEntity) {
    return this.taskService.update(id, updateEmployeeDto);
  }

  @Patch('/refunded')
  updateRefunded(@Query('idTask') idTask: string) {
    return this.taskService.updateRefunded(idTask);
  }

  @Delete()
  remove(@Query('idTask') idTask: string) {
    return this.taskService.remove(idTask);
  }
}
