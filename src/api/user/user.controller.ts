import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { WorkoutLocation } from 'enums/user';
import { JwtAuthGuard } from '#api/auth/guards/auth.guard';
import { UpdateConditionDto } from './dto/condition.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info/:id')
  getUserInfo(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // async updateUserInfo(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.updateUserInfo(id, updateUserDto);
  // }

  @Get('workout-location-options')
  getWorkoutLocationOptions() {
    return { options: Object.values(WorkoutLocation) };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/condition')
  async updateCondition(@Param('id') id: string, @Body() updateConditionDto: UpdateConditionDto) {
    return this.userService.updateCondition(id, updateConditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
