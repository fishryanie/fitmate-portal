import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Query, HttpCode, UseInterceptors, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpDocument, Permission, Role, User } from './auth.schema';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPhoneNumber } from 'class-validator';
import { GoogleAuthGuard } from '#firebase/guard/google.guard';
import { PermissionDto, RoleDto, Tokens, UserDto } from './dto';
import { Request, Response } from 'express';
import { EmailDto, PhoneDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('/check-phone')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('phone'))
  @ApiOperation({ summary: 'Check phone' })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Phone already exists.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Phone not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async checkPhone(@Res() res: Response, @Body() requestBody: PhoneDto) {
    const result = await this.authService.checkPhone(requestBody);
    if (result.statusCode === HttpStatus.CONFLICT) {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).json(result);
  }

  @Post('/check-email')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('email'))
  @ApiOperation({ summary: 'Check email' })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  async checkEmail(@Res() res: Response, @Body() requestBody: EmailDto) {
    const result = await this.authService.checkEmail(requestBody);
    if (result.statusCode === HttpStatus.CONFLICT) {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).json(result);
  }

  @Post('create-password')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('password'))
  @ApiOperation({ summary: 'Create new password' })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create new password successfully.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  createNewPwd(@Req() req) {
    return this.authService.registerPhone(req.user, );
  }

  @Post('/register-phone')
  @UseInterceptors(FileInterceptor('phone'))
  @ApiOperation({ summary: 'Register a new account by phone number' })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Register a new account successfully.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Phone already exists.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  registerPhone(@Body() requestBody: PhoneDto) {
    return this.authService.registerPhone(requestBody.phone);
  }

  // @Post('/register-phone')
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({ summary: 'Upload a new file' })
  // @ApiBody({ type: RegisterPhoneDto })
  // @ApiResponse({ status: HttpStatus.CREATED, description: 'Upload a new file successfully.' })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  // login(@Body() requestBody: RegisterPhoneDto) {
  //   return this.authService.signUpPhone(requestBody);
  // }
  // @Post()
  // async createPermission(@Body() permissionDto: PermissionDto): Promise<Permission> {
  //   return this.authService.createPermission(permissionDto);
  // }

  // @Put(':id')
  // async updatePermission(@Param('id') id: string, @Body() permissionDto: PermissionDto): Promise<Permission | null> {
  //   return this.authService.updatePermission(id, permissionDto);
  // }

  // @Delete(':id')
  // async deletePermission(@Param('id') id: string): Promise<Permission | null> {
  //   return this.authService.deletePermission(id);
  // }

  // @Get(':id')
  // async getPermissionById(@Param('id') id: string): Promise<Permission | null> {
  //   return this.authService.getPermissionById(id);
  // }

  // @Post()
  // async createRole(@Body() roleDto: RoleDto): Promise<Role> {
  //   return this.authService.createRole(roleDto);
  // }

  // @Put(':id')
  // async updateRole(@Param('id') id: string, @Body() roleDto: RoleDto): Promise<RoleDto> {
  //   return this.authService.updateRole(id, roleDto);
  // }

  // @Delete(':id')
  // async deleteRole(@Param('id') id: string): Promise<Role | null> {
  //   return this.authService.deleteRole(id);
  // }

  // @Get(':id')
  // async getRoleById(@Param('id') id: string): Promise<Role | null> {
  //   return this.authService.getRoleById(id);
  // }

  // @Get('/getUser')
  // getUser(@Query('idUser') idUser: string) {
  //   return 'getUser';
  // }

  // @UseGuards(RtGuard)
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string): Promise<Tokens> {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }

  // @Post('/login')
  // @HttpCode(HttpStatus.OK)
  // async Login(@Res() response: any, @Body() body: UserDto): Promise<Tokens> {
  //   return response.send(await this.authService.login(body.username, body.password));
  // }

  // @Get('google/login')
  // @UseGuards(GoogleAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // handleLogin() {
  //   return { msg: 'Google Authentication' };
  // }

  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // handleRedirect() {
  //   return { msg: 'OK' };
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('/logout')
  // @HttpCode(HttpStatus.OK)
  // async Logout(@Req() req: Request, @Res() response: Response) {
  //   const currentUser = req.user;
  //   return response.send(await this.authService.logout(currentUser['id']));
  // }

  // @UseGuards(AuthGuard('jwt-refresh'))
  // @Post('/refreshToken')
  // @HttpCode(HttpStatus.OK)
  // async RefreshToken() {}

  // @Post('/signup')
  // @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(FileInterceptor('file'))
  // async Signup(
  //   @Res() response,
  //   @Body() body: { ...UsserDto; type: 'signup' | 'forgetPwd' | null },
  // ) {
  //   return response.send(await this.userService.signup({}));
  // }

  // @Post('/sendOtp')
  // @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(FileInterceptor('file'))
  // async sendOtp(@Res() response: any, @Body() body: OtpDocument) {
  //   const modifiedNumber = body.phone.replace(/^\+84/, '0');
  //   return response.send(await this.authService.sendOTP(modifiedNumber));
  // }

  // @Post('/verifyOtp')
  // @UseInterceptors(FileInterceptor('file'))
  // async verifyOtp(@Res() response: any, @Body() body: OtpDocument) {
  //   const modifiedNumber = body.phone.replace(/^\+84/, '0');
  //   return response.json(await this.authService.verifyOTP(modifiedNumber, body.otp));
  // }
}
