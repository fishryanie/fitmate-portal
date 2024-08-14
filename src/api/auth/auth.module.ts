import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './auth.controller';
import { AuthService } from './auth.service';
import { Otp, Role, Permission, OtpSchema, RoleSchema, PermissionSchema } from './auth.schema';
import { UserModule } from '#api/user/user.module';
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    UserModule,
  ],
  controllers: [UserController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthenticationModule {}
