import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true })
export class ExerciseGoal {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export type ExerciseGoalDocument = HydratedDocument<ExerciseGoal>;

export const ExerciseGoalSchema = SchemaFactory.createForClass(ExerciseGoal);
