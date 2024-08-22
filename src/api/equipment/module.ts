import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from './schemas/equipment.schema';
import { EquipmentController } from '@api/equipment/controller';
import { EquipmentService } from '@api/equipment/service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Equipment.name, schema: EquipmentSchema }])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
