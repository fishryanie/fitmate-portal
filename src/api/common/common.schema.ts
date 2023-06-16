import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EXPIRES_OTP } from '#constant';
import { IsPhoneNumber } from 'class-validator';
import mongoose from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  // @IsPhoneNumber('VI')
  otp: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    type: Date,
    default: Date.now,
    expires: EXPIRES_OTP,
    // index: { expireAfterSeconds: EXPIRES_OTP },
  })
  createdAt: Date;
}

// export const OtpSchema = SchemaFactory.createForClass(Otp);
// OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: EXPIRES_OTP });

export const OtpSchema = new mongoose.Schema(
  {
    otp: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: EXPIRES_OTP },
    },
  },
  { timestamps: true },
);
