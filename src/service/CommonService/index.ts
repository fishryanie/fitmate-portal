import { Injectable, Res } from '@nestjs/common';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '#schema';

@Injectable()
export class CommonService {
  constructor(@InjectModel(Otp.name) private userModel: Model<Otp>) {}
  // async sendOTP(phone: number): Promise<any> {
  //   const options = {
  //     digits: true,
  //     alphabets: false,
  //     upperCase: false,
  //     specialChars: false,
  //   };
  //   const OTP = otpGenerator.generate(6, options);
  //   const salt = await bcrypt.genSalt(10);
  //   const otp = await bcrypt.hash(OTP, salt);
  //   return await this.otpModel.create({ phone, otp });
  // }
}
