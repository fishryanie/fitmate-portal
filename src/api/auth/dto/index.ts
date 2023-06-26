import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
  readonly fullName?: string;
  @IsNotEmpty()
  @IsString()
  readonly username?: string;
  @IsNotEmpty()
  @IsString()
  readonly password?: string;
  @IsEmail()
  readonly email?: string;
  @IsPhoneNumber()
  @IsString()
  readonly phone?: string;
  readonly pictureSocial?: string | FileSystem;
  readonly gender?: boolean;
  readonly isActive?: boolean;
  readonly refreshToken?: string;
}

export class RoleDto {
  readonly name: string;
  readonly permissions: string[];
}

export class PermissionDto {
  readonly type: string;
  readonly read: boolean;
  readonly write: boolean;
  readonly delete: boolean;
}

export type Tokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};
