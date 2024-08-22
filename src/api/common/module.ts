import { Module } from '@nestjs/common';

import { CloudinaryModule } from '@api/upload/cloudinary.module';
import { PasswordSwaggerGuard } from '@guards';
import { HttpModule } from '@nestjs/axios';
import { CommonController } from '@api/common/controller';
import { CommonService } from '@api/common/service';

@Module({
  imports: [CloudinaryModule, HttpModule],
  controllers: [CommonController],
  providers: [CommonService, PasswordSwaggerGuard],
})
export class CommonModule {}
