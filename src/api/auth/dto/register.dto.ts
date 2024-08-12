import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({ description: 'Email address', required: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;
}

export class PhoneDto {
  @ApiProperty({ description: 'Phone number', required: true })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  readonly phone: string;
}

export class PasswordDto {
  @ApiProperty({ description: 'Password', required: true })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  readonly password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh Token', required: true })
  @IsString()
  @IsNotEmpty({ message: 'Refresh Token is required' })
  refreshToken: string;
}

export class LoginDto extends PasswordDto {
  @ApiProperty({ description: 'Username', required: true })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;
}

export class RegisterDto extends IntersectionType(PhoneDto, EmailDto) {}
