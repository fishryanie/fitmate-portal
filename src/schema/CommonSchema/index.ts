import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EXPIRES_OTP } from '#constant';

export type OtpDocument = Otp & Document;

@Schema({ collection: 'otp-collection', timestamps: true })
export class Otp {
  // @Prop({ required: true })
  // otp: number;
  // @Prop({ required: true })
  // phone: number;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
// OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: EXPIRES_OTP });
