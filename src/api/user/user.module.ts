import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpDocument, OtpSchema, User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EXPIRES_TOKEN } from '#constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: OtpDocument.name, schema: OtpSchema }]),

    // PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TOKEN },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
