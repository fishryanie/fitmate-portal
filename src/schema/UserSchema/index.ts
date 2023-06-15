import { EXPIRES_OTP } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
export type OTPDocument = OTP & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, default: Date.now() })
  createdDate: Date;

  @Prop({ required: true, default: true })
  gender: boolean;

  @Prop({ required: true, default: '' })
  phone: string;

  @Prop({ required: false })
  birthday: string;
}

@Schema()
export class OTP {
  @Prop({ required: true })
  otp: number;

  @Prop({ required: true })
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const OtpSchema = SchemaFactory.createForClass(OTP);

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });
