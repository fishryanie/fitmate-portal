import {
  Injectable,
  HttpStatus,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmailDto, PhoneDto } from './dto/register.dto';
import { TokenPayload, Tokens } from 'interfaces/tokens.interface';
import { ApiResponse, ResponseData } from 'interfaces/response.interface';
import { User, UserDocument } from '@api/user/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async generateTokens(userId: Types.ObjectId, username: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: userId, username }, { secret: process.env.JWT_SECRET_KEY, expiresIn: '15m' }),
      this.jwtService.signAsync({ sub: userId, username }, { secret: process.env.JWT_REFRESH_KEY, expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }

  async updateToken(userId: Types.ObjectId, accessToken: Tokens['accessToken'], refreshToken: Tokens['refreshToken']) {
    const hashedAccessToken = await bcrypt.hash(accessToken, 10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, { accessToken: hashedAccessToken, refreshToken: hashedRefreshToken });
  }

  async refreshToken(refreshToken: Tokens['refreshToken']) {
    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const currentUser = await this.userModel.findById(payload.sub);
      if (!currentUser || currentUser.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const generateTokensResult = await this.generateTokens(currentUser._id, currentUser.phone);
      await this.updateToken(currentUser._id, generateTokensResult.accessToken, generateTokensResult.refreshToken);
      return {
        accessToken: generateTokensResult.accessToken,
        refreshToken: generateTokensResult.refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async checkPhone(request: PhoneDto): Promise<{ statusCode: HttpStatus.CONFLICT | HttpStatus.NOT_FOUND; message: string }> {
    try {
      const phoneAlreadyExists = await this.userModel.findOne({ phone: request.phone }).exec();
      if (phoneAlreadyExists) {
        return { statusCode: HttpStatus.CONFLICT, message: 'Phone number already exists' };
      }
      return { statusCode: HttpStatus.NOT_FOUND, message: 'Phone not found' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(username: string, password: string): Promise<ResponseData<Tokens>> {
    try {
      const currentUser = await this.userModel.findOne({ username }).exec();
      if (!currentUser) {
        throw new NotAcceptableException('Username is incorrect');
      }
      const isMatch = await bcrypt.compare(password, currentUser.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return {
        code: HttpStatus.OK,
        message: 'Loggin Success',
        data: {
          accessToken: currentUser.accessToken,
          refreshToken: currentUser.refreshToken,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkEmail(request: EmailDto): Promise<{ statusCode: HttpStatus.CONFLICT | HttpStatus.NOT_FOUND; message: string }> {
    try {
      const emailAlreadyExists = await this.userModel.findOne({ email: request.email }).exec();
      if (emailAlreadyExists) {
        return { statusCode: HttpStatus.CONFLICT, message: 'Email already exists' };
      }
      return { statusCode: HttpStatus.NOT_FOUND, message: 'Email not found' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async registerPhone(phone: string): Promise<Tokens> {
    try {
      const checkPhoneResult = await this.checkPhone({ phone });
      if (checkPhoneResult.statusCode === HttpStatus.CONFLICT) {
        throw new ConflictException(checkPhoneResult.message);
      }
      const newAccount = await this.userModel.create({ phone, username: phone });
      const { accessToken, refreshToken } = await this.generateTokens(newAccount._id, newAccount.phone);
      await this.updateToken(newAccount._id, accessToken, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new InternalServerErrorException(error, 'Failed to create user');
    }
  }

  async createPassword(userId: string, newPassword: string): Promise<ApiResponse> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword }).exec();
    return {
      code: HttpStatus.CREATED,
      message: 'Create new password successfully',
    };
  }

  /* Permission */
  // async createPermission(permission: Permission): Promise<Permission> {
  //   const createdPermission = new this.permissionModel(permission);
  //   return createdPermission.save();
  // }

  // async updatePermission(id: string, permission: Permission): Promise<Permission | null> {
  //   return this.permissionModel.findByIdAndUpdate(id, permission, { new: true }).exec();
  // }

  // async deletePermission(id: string): Promise<Permission | null> {
  //   return this.permissionModel.findByIdAndRemove(id).exec();
  // }

  // async getPermissionById(id: string): Promise<Permission | null> {
  //   return this.permissionModel.findById(id).exec();
  // }
  /* Permission */

  /* Role */
  // async createRole(role: Role): Promise<Role> {
  //   try {
  //     const createdRole = new this.roleModel(role);
  //     return await createdRole.save();
  //   } catch (error) {
  //     throw new Error('Không thể tạo vai trò.');
  //   }
  // }

  // async updateRole(id: string, role: Role): Promise<RoleDocument | null> {
  //   try {
  //     return await this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
  //   } catch (error) {
  //     throw new NotFoundException('Không tìm thấy vai trò để cập nhật.');
  //   }
  // }

  // async deleteRole(id: string): Promise<Role | null> {
  //   try {
  //     return await this.roleModel.findByIdAndRemove(id).exec();
  //   } catch (error) {
  //     throw new NotFoundException('Không tìm thấy vai trò để xóa.');
  //   }
  // }

  // async getRoleById(id: string): Promise<Role | null> {
  //   try {
  //     return await this.roleModel.findById(id).exec();
  //   } catch (error) {
  //     throw new NotFoundException('Không tìm thấy vai trò.');
  //   }
  // }
  /* Role */

  // public async signup(body: UserDto) {
  //   const options = {};
  //   if (body.phone) {
  //     options['phone'] = body.phone;
  //   }
  //   if (body.email) {
  //     options['email'] = body.email;
  //   }
  //   const foundUser = await this.userModel.findOne(options).exec();
  //   if (foundUser) {
  //     throw new BadRequestException('Registered account');
  //   }
  //   const pwdGenerator = generator.generate({
  //     length: 16,
  //     strict: true,
  //     numbers: true,
  //     symbols: true,
  //     lowercase: true,
  //     uppercase: true,
  //     excludeSimilarCharacters: true,
  //   });
  //   const salt = await bcrypt.genSalt();
  //   const hash = await bcrypt.hash(pwdGenerator, salt);
  //   const newUser = new this.userModel({
  //     phone: body.phone ? body.phone : '',
  //     email: body.email ? body.email : '',
  //     fullName: body.fullName || body.phone || body.email,
  //     username: body.phone || body.email,
  //     password: hash,
  //   });
  //   return newUser.save().then(() => {
  //     return {
  //       message: 'User Registration Successfully!',
  //       statusCode: HttpStatus.CREATED,
  //     };
  //   });
  // }

  // public async sendOTP(phone: string): Promise<any> {
  //   try {
  //     const otpGenerator = generator.generate({
  //       length: 6,
  //       numbers: true,
  //       uppercase: false,
  //       lowercase: false,
  //     });
  //     const salt = await bcrypt.genSalt(10);
  //     const otp = await bcrypt.hash(otpGenerator, salt);
  //     await this.otpModel.create({ phone, otp });
  //     return {
  //       phone,
  //       otp: otpGenerator,
  //       expires: EXPIRES_OTP,
  //       message: 'Success',
  //     };
  //   } catch (error) {
  //     if (error.code) {
  //       throw new BadRequestException('Please verify your phone number to move to the next step!');
  //     }
  //   }
  // }

  // public async verifyOTP(phone: string, otp: string): Promise<any> {
  //   const otpHolder = await this.otpModel.findOne({ phone }).exec();
  //   if (!otpHolder) {
  //     throw new NotFoundException('OTP Expired!');
  //   }
  //   const validOtp = await bcrypt.compare(otp, '22222');
  //   if (!validOtp) {
  //     throw new BadRequestException('OTP Wrong!');
  //   }
  //   return { message: 'Verify your phone number successfully!' };
  // }

  // public async deleteOTP(phone: string): Promise<any> {
  //   await this.otpModel.findOneAndDelete({
  //     phone: phone,
  //   });
  // }

  // public async changePassword(userId: string, currentPass: string, newPass: string): Promise<any> {
  //   const checkCurrentPass = await this.userModel.findOne({
  //     password: currentPass,
  //   });
  //   if (!checkCurrentPass) {
  //     throw new BadRequestException('Password is incorrect');
  //   }
  //   const isValidPwd = await bcrypt.compare(currentPass, checkCurrentPass.password);
  //   if (!isValidPwd) {
  //     throw new BadRequestException('Password is incorrect');
  //   }
  //   const salt = await bcrypt.genSalt();
  //   const hashNewPass = bcrypt.hash(newPass, salt);
  //   const result = await this.userModel.findOneAndUpdate({ _id: userId }, { password: hashNewPass }, { new: true, upsert: true });
  //   if (!result) {
  //     throw new NotFoundException('User does not exist');
  //   }
  //   return {
  //     success: true,
  //     message: 'Change Password Successfully!!!',
  //   };
  // }

  // async getOne(email: string): Promise<User> {
  //   return await this.userModel.findOne({ email }).exec();
  // }

  // async remove(id: string): Promise<any> {
  //   return this.userModel.findByIdAndDelete(id).exec();
  // }

  async logout(userId: string): Promise<any> {
    try {
      return this.userModel.findByIdAndUpdate({ _id: userId }, { refreshToken: null }, { new: true });
    } catch (error) {
      throw new Error('Đã có lỗi xảy ra');
    }
  }
}
