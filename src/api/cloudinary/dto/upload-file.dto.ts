import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum UploadFolder {
  User = 'user',
  FitnessExercise = 'fitness/exercise',
  FitnessMuscle = 'fitness/muscle',
}

export class UploadFileDto {
  @ApiProperty({
    enum: UploadFolder,
    description: 'The folder where the file will be uploaded',
    example: UploadFolder.User,
    required: true,
  })
  @IsEnum(UploadFolder, { message: 'Folder must be one of the predefined values' })
  @IsNotEmpty({ message: 'Folder is required' })
  folder: UploadFolder;

  @ApiProperty({
    description: 'Picture of the equipment (URL or base64 string)',
    type: 'string',
    format: 'binary',
    required: true,
  })
  @IsNotEmpty({ message: 'Folder is required' })
  file: Express.Multer.File;
}
