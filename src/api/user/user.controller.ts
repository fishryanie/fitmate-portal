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
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpDocument, User } from './user.schema';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPhoneNumber } from 'class-validator';
// import { User } from '../model/user.schema';

@ApiTags('/api/v1/user')
@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAll')
  getUser(@Query('idUser') idUser: string) {
    console.log('🚀 ~ file: index.ts:2 ~ User:', User.name);
    return 'getUser';
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async Signup(
    @Res() response,
    @Body() body: { phone: string; type: 'signup' | 'forgetPwd' | null },
  ) {
    return response.send(await this.userService.signup(body.phone));
  }

  @Post('/sendOtp')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async sendOtp(@Res() response: any, @Body() body: OtpDocument) {
    const modifiedNumber = body.phone.replace(/^\+84/, '0');
    return response.send(await this.userService.sendOTP(modifiedNumber));
  }

  @Post('/verifyOtp')
  @UseInterceptors(FileInterceptor('file'))
  async verifyOtp(@Res() response: any, @Body() body: OtpDocument) {
    const modifiedNumber = body.phone.replace(/^\+84/, '0');
    return response.json(
      await this.userService.verifyOTP(modifiedNumber, body.otp),
    );
  }

  // @Post('/signin')
  // async SignIn(@Res() response, @Body() user: User) {
  //     const token = await this.userServerice.signin(user, this.jwtService);
  //     return response.status(HttpStatus.OK).json(token)
  // }
}
