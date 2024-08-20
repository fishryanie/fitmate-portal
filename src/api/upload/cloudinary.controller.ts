import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('Upload File')
@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a new file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Upload a new file', type: UploadFileDto })
  @ApiResponse({ status: 201, description: 'Upload a new file successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFile: UploadFileDto) {
    return this.cloudinaryService.uploadFile(file, uploadFile);
  }
}
