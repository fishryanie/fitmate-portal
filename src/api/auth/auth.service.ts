import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import generator from 'generate-password';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Otp, Permission, Role, RoleDocument, User } from './auth.schema';
import { EXPIRES_OTP } from '#constant';
import { UserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  /* Auth */
  async getTokens(userId: Types.ObjectId, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: userId, username }, { secret: process.env.JWT_SECRET_KEY, expiresIn: '15m' }),
      this.jwtService.signAsync({ sub: userId, username }, { secret: process.env.JWT_REFRESH_KEY, expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }

  async login(username: string, password: string): Promise<any> {
    const foundUser = await this.userModel.findOne({ username }).exec();
    if (!foundUser) {
      throw new NotAcceptableException('Username is incorrect');
    }
    if (!bcrypt.compare(foundUser.password, password)) {
      throw new BadRequestException('Password is incorrect');
    }
    const tokens = await this.getTokens(foundUser._id, username);
    await this.userModel
      .findOneAndUpdate(
        { _id: foundUser._id },
        { $set: { refreshToken: tokens.refreshToken } },
        { new: true, upsert: true, strict: false, returnNewDocument: true },
      )
      .exec();
    return {
      success: true,
      message: 'Login Successfully',
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }
  /* Auth */

  /* Permission */
  async createPermission(permission: Permission): Promise<Permission> {
    const createdPermission = new this.permissionModel(permission);
    return createdPermission.save();
  }

  async updatePermission(id: string, permission: Permission): Promise<Permission | null> {
    return this.permissionModel.findByIdAndUpdate(id, permission, { new: true }).exec();
  }

  async deletePermission(id: string): Promise<Permission | null> {
    return this.permissionModel.findByIdAndRemove(id).exec();
  }

  async getPermissionById(id: string): Promise<Permission | null> {
    return this.permissionModel.findById(id).exec();
  }
  /* Permission */

  /* Role */
  async createRole(role: Role): Promise<Role> {
    try {
      const createdRole = new this.roleModel(role);
      return await createdRole.save();
    } catch (error) {
      throw new Error('Không thể tạo vai trò.');
    }
  }

  async updateRole(id: string, role: Role): Promise<RoleDocument | null> {
    try {
      return await this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
    } catch (error) {
      throw new NotFoundException('Không tìm thấy vai trò để cập nhật.');
    }
  }

  async deleteRole(id: string): Promise<Role | null> {
    try {
      return await this.roleModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new NotFoundException('Không tìm thấy vai trò để xóa.');
    }
  }

  async getRoleById(id: string): Promise<Role | null> {
    try {
      return await this.roleModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Không tìm thấy vai trò.');
    }
  }
  /* Role */

  public async signup(body: UserDto) {
    const options = {};
    if (body.phone) {
      options['phone'] = body.phone;
    }
    if (body.email) {
      options['email'] = body.email;
    }
    const foundUser = await this.userModel.findOne(options).exec();
    if (foundUser) {
      throw new BadRequestException('Registered account');
    }
    const pwdGenerator = generator.generate({
      length: 16,
      strict: true,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      excludeSimilarCharacters: true,
    });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pwdGenerator, salt);
    const newUser = new this.userModel({
      phone: body.phone ? body.phone : '',
      email: body.email ? body.email : '',
      fullName: body.fullName || body.phone || body.email,
      username: body.phone || body.email,
      password: hash,
    });
    return newUser.save().then(() => {
      return {
        message: 'User Registration Successfully!',
        statusCode: HttpStatus.CREATED,
      };
    });
  }

  public async sendOTP(phone: string): Promise<any> {
    try {
      const otpGenerator = generator.generate({
        length: 6,
        numbers: true,
        uppercase: false,
        lowercase: false,
      });
      const salt = await bcrypt.genSalt(10);
      const otp = await bcrypt.hash(otpGenerator, salt);
      await this.otpModel.create({ phone, otp });
      return {
        phone,
        otp: otpGenerator,
        expires: EXPIRES_OTP,
        message: 'Success',
      };
    } catch (error) {
      if (error.code) {
        throw new BadRequestException('Please verify your phone number to move to the next step!');
      }
    }
  }

  public async verifyOTP(phone: string, otp: string): Promise<any> {
    const otpHolder = await this.otpModel.findOne({ phone }).exec();
    if (!otpHolder) {
      throw new NotFoundException('OTP Expired!');
    }
    const validOtp = await bcrypt.compare(otp, '22222');
    if (!validOtp) {
      throw new BadRequestException('OTP Wrong!');
    }
    return { message: 'Verify your phone number successfully!' };
  }

  public async deleteOTP(phone: string): Promise<any> {
    await this.otpModel.findOneAndDelete({
      phone: phone,
    });
  }

  public async changePassword(userId: string, currentPass: string, newPass: string): Promise<any> {
    const checkCurrentPass = await this.userModel.findOne({
      password: currentPass,
    });
    if (!checkCurrentPass) {
      throw new BadRequestException('Password is incorrect');
    }
    const isValidPwd = await bcrypt.compare(currentPass, checkCurrentPass.password);
    if (!isValidPwd) {
      throw new BadRequestException('Password is incorrect');
    }
    const salt = await bcrypt.genSalt();
    const hashNewPass = bcrypt.hash(newPass, salt);
    const result = await this.userModel.findOneAndUpdate({ _id: userId }, { password: hashNewPass }, { new: true, upsert: true });
    if (!result) {
      throw new NotFoundException('User does not exist');
    }
    return {
      success: true,
      message: 'Change Password Successfully!!!',
    };
  }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async logout(userId: string): Promise<any> {
    try {
      return this.userModel.findByIdAndUpdate({ _id: userId }, { refreshToken: null }, { new: true });
    } catch (error) {
      throw new Error('Đã có lỗi xảy ra');
    }
  }
}
