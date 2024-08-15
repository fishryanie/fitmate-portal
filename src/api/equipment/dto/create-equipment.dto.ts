import { ApiProperty } from '@nestjs/swagger';

export enum EquipmentType {
  Electronic = 'Electronic',
  Mechanical = 'Mechanical',
  Hydraulic = 'Hydraulic',
}

export class CreateEquipmentDto {
  @ApiProperty({ description: 'Name of the equipment' })
  name: string;

  @ApiProperty({ description: 'Description of the equipment' })
  description: string;

  @ApiProperty({
    description: 'Type of the equipment',
    enum: EquipmentType,
  })
  type: EquipmentType;

  @ApiProperty({
    description: 'Picture of the equipment (URL or base64 string)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  picture?: Express.Multer.File;
}
