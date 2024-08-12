import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

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

export class RegisterDto extends IntersectionType(PhoneDto, EmailDto) {}
