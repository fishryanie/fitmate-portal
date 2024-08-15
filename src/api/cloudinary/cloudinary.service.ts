import * as streamifier from 'streamifier';
import { v2 as cloudinary, UploadApiErrorResponse } from 'cloudinary';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File, uploadFileDto: UploadFileDto) {
    try {
      const { folder } = uploadFileDto;
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
      return {
        message: 'File uploaded successfully',
        data: uploadResult,
      };
    } catch (error) {
      const err = error as UploadApiErrorResponse;
      if (err.http_code === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('File not found');
      }
      throw new InternalServerErrorException(`Failed to upload file: ${error.message}`);
    }
  }

  async deleteFile(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return {
        message: 'File deleted successfully',
        data: result,
      };
    } catch (error) {
      const err = error as UploadApiErrorResponse;
      if (err.http_code === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('File not found');
      }
      throw new InternalServerErrorException(`Failed to delete file: ${error.message}`);
    }
  }
}
