import { EXPIRES_OTP } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsPhoneNumber } from 'class-validator';

export type UserDocument = User & Document;

@Schema({ collection: 'user-collection', autoIndex: true, timestamps: true })
export class User {
  @Prop({ required: false })
  fullName: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, default: true })
  gender: boolean;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  birthday: string;

  @Prop()
  refreshToken: string;
}

@Schema({ collection: 'otp-collection', timestamps: true })
export class OtpDocument {
  @Prop({ required: true })
  otp: string;

  @Prop({ required: true, unique: true })
  @IsPhoneNumber('VI')
  phone: string;

  @Prop({
    type: Date,
    default: Date.now,
    expires: EXPIRES_OTP,
    index: { expireAfterSeconds: EXPIRES_OTP },
  })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(OtpDocument);
export const UserSchema = SchemaFactory.createForClass(User);
