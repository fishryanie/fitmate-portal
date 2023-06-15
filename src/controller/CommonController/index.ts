import { CommonService } from '#service/CommonService';
import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller('api/v1/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('/sendOtp')
  async SendOtp(@Res() response, @Body() body: { phone: number }) {
    // const result = await this.commonService.sendOTP(body.phone);
    // return response.status(HttpStatus.CREATED).json({
    //   result,
    // });
  }
}
