import { ApiTags } from '@nestjs/swagger';
import { CommonService } from '@api/common/service';
import { Controller, Get, Query } from '@nestjs/common';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(private readonly service: CommonService) {}

  @Get('shorten')
  async shorten(@Query('url') url: string) {
    return this.service.shortenLink(url);
  }

  @Get('terms-policy')
  getTermsPolicy() {
    return this.service.getTermsPolicy('vi');
  }

  @Get('province')
  getProvince() {
    return this.service.getProvince();
  }

  @Get('district')
  getDistrict(@Query('idProvince') idProvince: string) {
    return this.service.getDistrict(idProvince);
  }

  @Get('ward')
  getWard(@Query('idDistrict') idDistrict: string) {
    return this.service.getWard(idDistrict);
  }
}
