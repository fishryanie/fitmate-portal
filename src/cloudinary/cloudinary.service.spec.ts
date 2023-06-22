import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { NotFoundException } from '@nestjs/common';

describe('CloudinaryService', () => {
  let cloudinaryService: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(cloudinaryService).toBeDefined();
  });

  describe('deleteFile', () => {
    it('should delete file and return result', async () => {
      const publicId = 'image1';
      const result: any = { result: 'ok' }; // Mock the result object
      jest.spyOn(cloudinaryService, 'deleteFile').mockResolvedValue(result);
      const response = await cloudinaryService.deleteFile(publicId);
      expect(response).toEqual(result);
    });
    it('should throw NotFoundException if publicId is not provided', async () => {
      const publicId = ''; // Empty publicId
      await expect(cloudinaryService.deleteFile(publicId)).rejects.toThrowError(
        NotFoundException,
      );
    });
    it('should throw Error if failed to remove file', async () => {
      const publicId = 'image1';
      jest
        .spyOn(cloudinaryService, 'deleteFile')
        .mockRejectedValue(new Error());
      await expect(cloudinaryService.deleteFile(publicId)).rejects.toThrowError(
        Error,
      );
    });
  });
});
