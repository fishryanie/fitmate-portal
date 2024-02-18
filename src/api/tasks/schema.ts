/* eslint-disable prettier/prettier */
import { COLLECTION_NAME } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: COLLECTION_NAME.task,
  autoIndex: true,
  timestamps: true,
})
export class Task {
  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  quantity: boolean;

  @Prop({ default: false })
  unit: boolean;

  @Prop({ default: false })
  location: boolean;

  @Prop({ default: undefined })
  payer: string ;

  @Prop({ default: false })
  status: 'withdrawn' | 'unWithdrawn';

  @Prop({ default: false })
  vat: boolean;

  @Prop({ default: false })
  delete: boolean;
}

export type TaskDocument = HydratedDocument<Task>;

export const TaskSchema = SchemaFactory.createForClass(Task);
