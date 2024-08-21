import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmpty } from 'class-validator';
import { COLLECTION_NAME } from 'enums/schema';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: COLLECTION_NAME.exerciseCategories, autoIndex: true, timestamps: true, versionKey: false, strict: true })
export class ExerciseCategories {
  @Prop({ type: String, required: true, unique: true })
  @IsEmpty()
  title: string;
  @Prop()
  description: string;
}

export type ExerciseCategoriesDocument = HydratedDocument<ExerciseCategories>;

export const ExerciseCategoriesSchema = SchemaFactory.createForClass(ExerciseCategories);
