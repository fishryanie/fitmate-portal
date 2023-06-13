import { DATA_LOCATION, DATA_TERMS_POLICY } from '#mocks';
import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import {
  TypeDistrict,
  TypeProvince,
  TypeTermsPolicy,
  TypeWard,
} from '#mocks/types';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTermsPolicy(language: string | null): TypeTermsPolicy[] {
    return language === 'en' ? DATA_TERMS_POLICY.en : DATA_TERMS_POLICY.vi;
  }

  getProvince(): TypeProvince[] {
    return DATA_LOCATION.province;
  }

  getDistrict(idProvince: string | null): TypeDistrict[] {
    if (!idProvince) {
      return DATA_LOCATION.district;
    }
    return DATA_LOCATION.district.filter((district: TypeDistrict) => {
      return district.idProvince === idProvince;
    });
  }

  getWard(idDistrict: string | null): TypeWard[] {
    if (!idDistrict) {
      return DATA_LOCATION.ward;
    }
    return DATA_LOCATION.ward.filter((ward: TypeWard) => {
      return ward.idDistrict === idDistrict;
    });
  }
}
