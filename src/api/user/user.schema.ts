import { COLLECTION_NAME } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, WorkoutLocation } from 'enums/user';
import { HydratedDocument } from 'mongoose';

class Condition {
  @Prop({ type: Number, min: 50, max: 300 })
  height: number;

  @Prop({ type: Number, min: 20, max: 300 })
  weight: number;

  @Prop({ type: String })
  goal: string;

  @Prop({ type: Number, min: 1, max: 7 })
  workoutDays: number;

  @Prop({ type: String, enum: WorkoutLocation })
  workoutLocation: WorkoutLocation;
}

@Schema({ collection: COLLECTION_NAME.user, autoIndex: true, timestamps: true })
export class User {
  @Prop({ required: false })
  fullName: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: false, trim: true })
  password: string;

  @Prop({ unique: true, sparse: true })
  phone: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ type: Date })
  birthday?: Date;

  @Prop({ required: false, enum: Gender })
  gender: Gender;

  @Prop()
  refreshToken: string;

  @Prop({ type: String, required: false, unique: true, sparse: true })
  accessToken: string;

  @Prop({ type: Condition, required: false })
  condition: Condition;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('validate', function (next) {
  if (!this.phone && !this.email) {
    this.invalidate('phone', 'Either phone or email must be provided');
    this.invalidate('email', 'Either phone or email must be provided');
  }
  next();
});
