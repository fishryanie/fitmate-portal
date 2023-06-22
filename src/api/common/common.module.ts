import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { CloudinaryService } from 'cloudinary/cloudinary.service';
import { CloudinaryModule } from 'cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
