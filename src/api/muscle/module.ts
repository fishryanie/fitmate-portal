import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MuscleController } from '@api/muscle/controller';
import { Muscle, MuscleSchema } from '@api/muscle/schema';
import { MuscleService } from '@api/muscle/service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Muscle.name, schema: MuscleSchema }])],
  controllers: [MuscleController],
  providers: [MuscleService],
})
export class MuscleModule {}
