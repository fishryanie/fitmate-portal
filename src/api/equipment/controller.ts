import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '@base';
import { EquipmentService } from '@api/equipment/service';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController extends BaseController<EquipmentService> {
  constructor(readonly service: EquipmentService) {
    super(service);
  }
}
