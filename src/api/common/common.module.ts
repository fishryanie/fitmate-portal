import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { CloudinaryModule } from '@api/upload/cloudinary.module';
import { PasswordSwaggerGuard } from '@guards';

@Module({
  imports: [CloudinaryModule],
  controllers: [CommonController],
  providers: [CommonService, PasswordSwaggerGuard],
})
export class CommonModule {}
