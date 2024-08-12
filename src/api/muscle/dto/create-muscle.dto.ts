import { ApiProperty } from '@nestjs/swagger';

export class CreateMuscleDto {
  @ApiProperty({ description: 'Name of the equipment' })
  name: string;

  @ApiProperty({ description: 'Description of the equipment', required: false })
  description: string;

  @ApiProperty({ description: 'Id of the muscle (MongoDB ObjectId)', required: false })
  idParent: string;

  @ApiProperty({
    description: 'Picture of the equipment (URL or base64 string)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  picture?: Express.Multer.File;
}
