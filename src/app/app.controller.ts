import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  TypeDistrict,
  TypeProvince,
  TypeTermsPolicy,
  TypeWard,
} from '#mocks/types';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/getProvince')
  getTermsPolicy(): TypeTermsPolicy[] {
    return this.appService.getTermsPolicy('vi');
  }

  @Get('/getProvince')
  getProvince(): TypeProvince[] {
    return this.appService.getProvince();
  }

  @Get('/getDistrict')
  getDistrict(@Query('idProvince') idProvince: string): TypeDistrict[] {
    return this.appService.getDistrict(idProvince);
  }

  @Get('/getWard')
  getWard(@Query('idDistrict') idDistrict: string): TypeWard[] {
    return this.appService.getWard(idDistrict);
  }
}
