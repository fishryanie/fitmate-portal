import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './controller';
import { RestaurantService } from './service';
import { Restaurant, RestaurantSchema } from './schema';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
