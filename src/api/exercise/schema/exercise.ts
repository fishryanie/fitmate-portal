import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true })
export class Exercise {
  @Prop()
  title: string;
  @Prop()
  equipment: string;
  @Prop()
  description: string;
  @Prop()
  image_url: string;
  @Prop()
  muscles_targeted: string;
}

export type ExerciseDocument = Exercise & Document;

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
