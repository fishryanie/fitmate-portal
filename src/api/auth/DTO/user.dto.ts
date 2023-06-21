import { IsEmail, IsPhoneNumber } from 'class-validator';

export class UserDto {
  fullName?: string;
  usernames?: string;
  password?: string;
  email?: string;
  phone?: string;
  pictureSocial?: string | FileSystem;
  gender?: boolean;
  isActive?: boolean;
  refreshToken?: string;
}
