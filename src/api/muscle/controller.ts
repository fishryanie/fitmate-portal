import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { MuscleService } from '@api/muscle/service';
import { BaseController } from '@base';

@ApiTags('Muscle')
@Controller('muscle')
export class MuscleController extends BaseController<MuscleService> {
  constructor(readonly service: MuscleService) {
    super(service);
  }
}
