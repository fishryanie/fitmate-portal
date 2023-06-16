import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'user-collection', autoIndex: true, timestamps: true })
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
export const UserSchema = SchemaFactory.createForClass(User);
