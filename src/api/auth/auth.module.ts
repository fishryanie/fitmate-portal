import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  Otp,
  Role,
  User,
  Permission,
  OtpSchema,
  RoleSchema,
  UserSchema,
  PermissionSchema,
} from './auth.schema';
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserModule {}
