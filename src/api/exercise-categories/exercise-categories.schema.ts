import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ExerciseCategories {
  @Prop()
  name: string;
  @Prop()
  description: string;
}

export type ExerciseCategoriesDocument = HydratedDocument<ExerciseCategories>;

export const ExerciseCategoriesSchema = SchemaFactory.createForClass(ExerciseCategories);
