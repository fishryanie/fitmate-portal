/* eslint-disable prettier/prettier */
import { COLLECTION_NAME, EXPIRES_OTP } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsPhoneNumber } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({
  collection: COLLECTION_NAME.permission,
  autoIndex: true,
  timestamps: true,
})
export class Permission {
  @Prop({ required: true })
  type: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: false })
  write: boolean;

  @Prop({ default: false })
  delete: boolean;
}

@Schema({ collection: COLLECTION_NAME.otp, timestamps: true })
export class Otp {
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

@Schema({ collection: COLLECTION_NAME.role, timestamps: true })
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: COLLECTION_NAME.permission }] })
  permissions: string[];
}

export type OtpDocument = HydratedDocument<Otp>;
export type RoleDocument = HydratedDocument<Role>;
export type PermissionDocument = HydratedDocument<Permission>;

export const OtpSchema = SchemaFactory.createForClass(Otp);
export const RoleSchema = SchemaFactory.createForClass(Role);
export const PermissionSchema = SchemaFactory.createForClass(Permission);
