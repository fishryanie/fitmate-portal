import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

@Schema()
export class Muscle {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MuscleGroup', default: null })
  parent_id?: MongooseSchema.Types.ObjectId;
}

export type MuscleDocument = HydratedDocument<Muscle>;

export const MuscleSchema = SchemaFactory.createForClass(Muscle);
