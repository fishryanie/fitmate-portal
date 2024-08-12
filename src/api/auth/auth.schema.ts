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

@Schema({ collection: COLLECTION_NAME.user, autoIndex: true, timestamps: true })
export class User {
  @Prop({ required: false })
  fullName: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: false, trim: true })
  password: string;

  @Prop({ required: false, default: true })
  gender: boolean;

  @Prop({ unique: true, sparse: true })
  phone: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ type: Date })
  birthday?: Date;

  @Prop()
  refreshToken: string;

  @Prop({ unique: true, sparse: true })
  accessToken: string;
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
export type UserDocument = HydratedDocument<User>;
export type RoleDocument = HydratedDocument<Role>;
export type PermissionDocument = HydratedDocument<Permission>;

export const OtpSchema = SchemaFactory.createForClass(Otp);
export const RoleSchema = SchemaFactory.createForClass(Role);
export const UserSchema = SchemaFactory.createForClass(User);
export const PermissionSchema = SchemaFactory.createForClass(Permission);

UserSchema.pre('validate', function (next) {
  if (!this.phone && !this.email) {
    this.invalidate('phone', 'Either phone or email must be provided');
    this.invalidate('email', 'Either phone or email must be provided');
  }
  next();
});
