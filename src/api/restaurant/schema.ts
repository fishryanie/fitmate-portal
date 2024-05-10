/* eslint-disable prettier/prettier */
import { COLLECTION_NAME } from '#constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: COLLECTION_NAME.restaurant,
  autoIndex: true,
  timestamps: true,
})
export class Restaurant {
  @Prop({ required: true })
  title: string;

  @Prop()
  address: string;
}

export type RestaurantDocument = Restaurant & Document;

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
