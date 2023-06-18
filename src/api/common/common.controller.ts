import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CommonService } from './common.service';
import {
  TypeDistrict,
  TypeProvince,
  TypeTermsPolicy,
  TypeWard,
} from '#mock/types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Common')
@Controller('/api/v1/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/getProvince')
  getTermsPolicy(): TypeTermsPolicy[] {
    return this.commonService.getTermsPolicy('vi');
  }

  @Get('/getProvince')
  getProvince(): TypeProvince[] {
    return this.commonService.getProvince();
  }

  @Get('/getDistrict')
  getDistrict(@Query('idProvince') idProvince: string): TypeDistrict[] {
    return this.commonService.getDistrict(idProvince);
  }

  @Get('/getWard')
  getWard(@Query('idDistrict') idDistrict: string): TypeWard[] {
    return this.commonService.getWard(idDistrict);
  }
}
