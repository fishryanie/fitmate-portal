import { v2 as cloudinary } from 'cloudinary';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
type FolderNameType = 'user/picture' | 'product/picture';
type QualityType = 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best';
type ResourceType = 'image' | 'video';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    folderName?: FolderNameType,
    quality?: QualityType,
    resourceType?: ResourceType,
  ): Promise<CloudinaryResponse> {
    if (file) {
      throw new NotFoundException('Not Found File');
    }
    const existingImage = await this.checkExistingImage(file);
    if (existingImage) {
      throw new BadGatewayException('Existing File');
    }
    try {
      const defaultFolderName = 'fitMate';
      const defaultQuality = 'auto:good';
      const defaultResourceType = 'auto';
      const result = await new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: `fitMate/${folderName || defaultFolderName}`,
              quality: quality || defaultQuality,
              resource_type: resourceType || defaultResourceType,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        },
      );
      return result;
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  }

  async deleteFile(publicId: string): Promise<CloudinaryResponse> {
    try {
      if (!publicId) {
        throw new NotFoundException('Pls select file');
      }
      const result = await new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          });
        },
      );
      return result;
    } catch (error) {
      throw new Error('Failed to remove file');
    }
  }

  async deleteFolder(folderName: string): Promise<void> {
    try {
      const deleteResult = await cloudinary.api.delete_resources_by_prefix(
        folderName,
      );
      if (deleteResult && deleteResult.deleted > 0) {
        await cloudinary.api.delete_folder(folderName);
      }
    } catch (error) {
      throw new Error('Failed to delete folder');
    }
  }

  async checkExistingImage(
    file: Express.Multer.File,
  ): Promise<CloudinaryResponse | null> {
    try {
      const query = await cloudinary.search
        .expression(`filename:${file.originalname}`)
        .execute();
      if (query.total_count > 0) {
        return query.resources[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Failed to check existing image');
    }
  }
}
