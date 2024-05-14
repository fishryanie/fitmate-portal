import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TypeDistrict, TypeProvince, TypeTermsPolicy, TypeWard } from '#mock/types';
import { CloudinaryService } from 'cloudinary/cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Common')
@Controller('/api/v1/common')
export class CommonController {
  constructor(private readonly commonService: CommonService, private readonly cloudinaryService: CloudinaryService) {}

  @Get('/config')
  getConfig() {
    return this.commonService.getConfig();
  }

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

  @Post('/uploadOne')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadOne(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file, 'user/picture');
  }

  @Post('/uploadMany')
  @UseInterceptors(FilesInterceptor('file[]', 5))
  uploadMany(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadPromises = files.map(file => this.cloudinaryService.uploadFile(file, 'user/picture'));
    return Promise.all(uploadPromises);
  }
}
