import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import generator from 'generate-password';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpDocument, User } from './user.schema';
import { EXPIRES_OTP } from '#constant';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(OtpDocument.name) private otpModel: Model<OtpDocument>,
  ) {}

  // async signIn(user: User, jwt: JwtService): Promise<any> {
  //   const foundUser = await this.userModel
  //     .findOne({ email: user.email })
  //     .exec();
  //   if (foundUser) {
  //     const { password } = foundUser;
  //     if (bcrypt.compare(user.password, password)) {
  //       const payload = { email: user.email };
  //       return {
  //         token: jwt.sign(payload),
  //       };
  //     }
  //     return new HttpException(
  //       'Incorrect username or password',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   return new HttpException(
  //     'Incorrect username or password',
  //     HttpStatus.UNAUTHORIZED,
  //   );
  // }

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

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
