import { Module } from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { MuscleController } from './muscle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Muscle, MuscleSchema } from './muscle.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Muscle.name, schema: MuscleSchema }])],
  controllers: [MuscleController],
  providers: [MuscleService],
})
export class MuscleModule {}
