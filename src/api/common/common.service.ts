import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// import otpGenerator from 'otp-generator';
import generator from 'generate-password';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DATA_LOCATION, DATA_TERMS_POLICY } from '#mock';
import {
  TypeDistrict,
  TypeProvince,
  TypeTermsPolicy,
  TypeWard,
} from '#mock/types';

@Injectable()
export class CommonService {
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
}
