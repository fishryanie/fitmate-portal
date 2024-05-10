import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './controller';
import { RestaurantService } from './service';
import { RestaurantSchema } from './schema';
import { COLLECTION_NAME } from '#constant';

@Module({
  imports: [MongooseModule.forFeature([{ name: COLLECTION_NAME.restaurant, schema: RestaurantSchema }])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
