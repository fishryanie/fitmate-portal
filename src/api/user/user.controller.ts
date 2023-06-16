import { UserService } from 'api/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { ApiTags } from '@nestjs/swagger';
// import { User } from '../model/user.schema';
// import { JwtService } from '@nestjs/jwt';

@ApiTags('user')
@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAll')
  getUser(@Query('idUser') idUser: string) {
    console.log('🚀 ~ file: index.ts:2 ~ User:', User.name);
    return 'getUser';
  }
  // async Signup(@Res() response, @Body() user: User) {
  //     const newUSer = await this.userServerice.signup(user);
  //     return response.status(HttpStatus.CREATED).json({
  //         newUSer
  //     })
  // }
  // @Post('/signin')
  // async SignIn(@Res() response, @Body() user: User) {
  //     const token = await this.userServerice.signin(user, this.jwtService);
  //     return response.status(HttpStatus.OK).json(token)
  // }
}
