import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CommonService } from './common.service';
import {
  TypeDistrict,
  TypeProvince,
  TypeTermsPolicy,
  TypeWard,
} from '#mock/types';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('common')
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

  @Post('/sendOtp')
  @UseInterceptors(FileInterceptor('file'))
  async sendOtp(@Res() response: any, @Body() body: { phone: string }) {
    const modifiedNumber = body.phone.replace(/^\+84/, '0');
    const result = await this.commonService.sendOTP(modifiedNumber);
    return response.status(HttpStatus.CREATED).send({
      data: result,
      phone: modifiedNumber,
      message: 'Created successfully',
    });
  }
}
