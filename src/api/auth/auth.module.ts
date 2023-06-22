import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpDocument, OtpSchema, User, UserSchema } from './auth.schema';
import { UserController } from './auth.controller';
import { AuthService } from './auth.service';
import { EXPIRES_TOKEN } from '#constant';
import { TokenMiddleware } from 'app.middleware';
import { CloudinaryService } from 'cloudinary/cloudinary.service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: OtpDocument.name, schema: OtpSchema }]),
  ],
  controllers: [UserController],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserModule {}
