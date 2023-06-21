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
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpDocument, User } from './auth.schema';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPhoneNumber } from 'class-validator';
import { GoogleAuthGuard } from '#firebase/guard/google.guard';
import { UserDto } from './DTO/user.dto';
// import { User } from '../model/user.schema';

@ApiTags('/api/v1/auth')
@Controller('/api/v1/auth')
export class UserController {
  constructor(private readonly userService: AuthService) {}

  @Get('/getUser')
  getUser(@Query('idUser') idUser: string) {
    return 'getUser';
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async Login(
    @Res() response: any,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return response.send(await this.userService.login(username, password));
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }

  // @Post('/signup')
  // @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(FileInterceptor('file'))
  // async Signup(
  //   @Res() response,
  //   @Body() body: { ...UsserDto; type: 'signup' | 'forgetPwd' | null },
  // ) {
  //   return response.send(await this.userService.signup({}));
  // }

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
}
