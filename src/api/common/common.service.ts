import { Injectable, InternalServerErrorException } from '@nestjs/common';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from './common.schema';
import { DATA_LOCATION, DATA_TERMS_POLICY } from '#mock';
import {
  TypeDistrict,
  TypeProvince,
  TypeTermsPolicy,
  TypeWard,
} from '#mock/types';

@Injectable()
export class CommonService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  getTermsPolicy(language: string | null): TypeTermsPolicy[] {
    return language === 'en' ? DATA_TERMS_POLICY.en : DATA_TERMS_POLICY.vi;
  }

  public getProvince(): TypeProvince[] {
    return DATA_LOCATION.province;
  }

  public getDistrict(idProvince: string | null): TypeDistrict[] {
    if (!idProvince) {
      return DATA_LOCATION.district;
    }
    return DATA_LOCATION.district.filter((district: TypeDistrict) => {
      return district.idProvince === idProvince;
    });
  }

  public getWard(idDistrict: string | null): TypeWard[] {
    if (!idDistrict) {
      return DATA_LOCATION.ward;
    }
    return DATA_LOCATION.ward.filter((ward: TypeWard) => {
      return ward.idDistrict === idDistrict;
    });
  }

  public getPaymentMethod() {
    return 'PaymentMethod Service';
  }

  public async sendOTP(phone: string): Promise<any> {
    const options = {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    };
    try {
      const OTP = otpGenerator.generate(6, options);
      const salt = await bcrypt.genSalt(10);
      const otp = await bcrypt.hash(OTP, salt);
      const result = await this.otpModel.create({ phone, otp });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
