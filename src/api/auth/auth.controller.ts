import { Body, Controller, HttpStatus, Post, Req, Res, HttpCode, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { EmailDto, LoginDto, PasswordDto, PhoneDto, RefreshTokenDto } from './dto/register.dto';
import { TokenVerifiedRequest } from 'interfaces/tokens.interface';
import { JwtAuthGuard } from '../../guards/jwtAuthGuard';

@ApiTags('Authentication')
@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @Post('refresh-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('refreshToken'))
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Refresh token not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('/check-phone')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('phone'))
  @ApiOperation({ summary: 'Check phone' })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Phone already exists.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Phone not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server error.' })
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async checkEmail(@Res() res: Response, @Body() requestBody: EmailDto) {
    const result = await this.authService.checkEmail(requestBody);
    if (result.statusCode === HttpStatus.CONFLICT) {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).json(result);
  }

  @Post('/register-phone')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('phone'))
  @ApiOperation({ summary: 'Register a new account by phone number' })
  @ApiBody({ type: PhoneDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Register a new account successfully.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Phone already exists.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  registerPhone(@Body() requestBody: PhoneDto) {
    return this.authService.registerPhone(requestBody.phone);
  }

  @Post('create-password')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('password'))
  @ApiOperation({ summary: 'Create new password' })
  @ApiBody({ type: PasswordDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create new password successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.CREATED)
  createNewPwd(@Req() req: TokenVerifiedRequest, @Body() body: PasswordDto) {
    return this.authService.createPassword(req.tokenVerified.sub, body.password);
  }
}
