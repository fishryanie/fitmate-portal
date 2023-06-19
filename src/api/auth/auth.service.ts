import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import generator from 'generate-password';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OtpDocument, User, UserDocument } from './auth.schema';
import { EXPIRES_OTP } from '#constant';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(OtpDocument.name) private otpModel: Model<OtpDocument>,
  ) {}

  private async getTokens(userId: Types.ObjectId, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        { secret: process.env.JWT_SECRET_KEY, expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        { secret: process.env.JWT_REFRESH_KEY, expiresIn: '7d' },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  public async login(username: string, password: string): Promise<any> {
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

  public async signup(phone: string) {
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
      phone: phone,
      fullName: phone,
      username: phone,
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
        throw new BadRequestException(
          'Please verify your phone number to move to the next step!',
        );
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

  public async changePassword(
    userId: string,
    currentPass: string,
    newPass: string,
  ): Promise<any> {
    const checkCurrentPass = await this.userModel.findOne({
      password: currentPass,
    });
    if (!checkCurrentPass) {
      throw new BadRequestException('Password is incorrect');
    }
    const isValidPwd = await bcrypt.compare(
      currentPass,
      checkCurrentPass.password,
    );
    if (!isValidPwd) {
      throw new BadRequestException('Password is incorrect');
    }
    const salt = await bcrypt.genSalt();
    const hashNewPass = bcrypt.hash(newPass, salt);
    const result = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { password: hashNewPass },
      { new: true, upsert: true },
    );
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
}
