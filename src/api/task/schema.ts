/* eslint-disable prettier/prettier */
import { COLLECTION_NAME } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  collection: COLLECTION_NAME.task,
  autoIndex: true,
  timestamps: true,
})
export class Task {
  @Prop({ index: true })
  title: string;
  @Prop()
  description: string;
  @Prop({default: false})
  isRefunded: boolean;
  @Prop()
  payer: string;
  @Prop()
  quantity: string;
  @Prop()
  unit: string;
  @Prop()
  price: string;
  @Prop()
  isVat: boolean;
  @Prop({ type: Types.ObjectId, ref: COLLECTION_NAME.restaurant })
  restaurant: Types.ObjectId
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
