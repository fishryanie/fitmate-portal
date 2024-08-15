import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseGoalDocument = ExerciseGoal & Document;

@Schema()
export class ExerciseGoal {
  @Prop()
  name: string;
  @Prop()
  description: string;
}

export const ExerciseGoalSchema = SchemaFactory.createForClass(ExerciseGoal);
