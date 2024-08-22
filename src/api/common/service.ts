import { DATA_LOCATION, DATA_TERMS_POLICY } from '#mock';
import { TypeDistrict, TypeProvince, TypeTermsPolicy, TypeWard } from '#mock/types';
import { Injectable } from '@nestjs/common';
import { ApiResponseData } from 'interfaces';
import { HttpService } from '@nestjs/axios';
import { ISGD_API_URL } from '@constants';
import { firstValueFrom } from 'rxjs';
import { BaseResponse } from '@base';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  async shortenLink(longUrl: string): Promise<ApiResponseData<{ url: string }>> {
    const response = await firstValueFrom(
      this.httpService.get<string>(ISGD_API_URL, {
        params: { format: 'simple', url: longUrl },
      }),
    );
    return new BaseResponse({ url: response.data });
  }

  getTermsPolicy(language: string): ApiResponseData<TypeTermsPolicy[]> {
    const data = language === 'en' ? DATA_TERMS_POLICY.en : DATA_TERMS_POLICY.vi;
    return new BaseResponse(data);
  }

  public getProvince(): ApiResponseData<TypeProvince[]> {
    return new BaseResponse(DATA_LOCATION.province);
  }

  public getDistrict(idProvince: string): ApiResponseData<TypeDistrict[] | TypeDistrict> {
    if (!idProvince) {
      return new BaseResponse(DATA_LOCATION.district);
    }
    const result = DATA_LOCATION.district.filter((district: TypeDistrict) => {
      return district.idProvince === idProvince;
    });
    return new BaseResponse(result);
  }

  public getWard(idDistrict: string): ApiResponseData<TypeWard[]> {
    if (!idDistrict) {
      return new BaseResponse(DATA_LOCATION.ward);
    }
    const result = DATA_LOCATION.ward.filter((ward: TypeWard) => {
      return ward.idDistrict === idDistrict;
    });
    return new BaseResponse(result);
  }

  public getPaymentMethod() {
    return new BaseResponse('PaymentMethod Service');
  }
}
