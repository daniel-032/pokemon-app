import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { TrainerGprcService } from '../../services/gprc/trainer.gprc.service';
import { TrainerGPRC } from '../../interfaces/trainer.gprc.interface';
import {
  validateInputCreate,
  validateInputUpdate,
} from '../../helpers/validation.helper';

@Controller('trainers')
export class TrainerGprcController {
  constructor(private readonly trainerGprcService: TrainerGprcService) {}

  @GrpcMethod('TrainerService', 'CreateTrainer')
  create(rawData: any) {
    const dto = validateInputCreate(rawData);
    return this.trainerGprcService.create(dto);
  }

  @GrpcMethod('TrainerService', 'ListTrainers')
  async findAll() {
    const trainers: TrainerGPRC[] = await this.trainerGprcService.findAll();
    return { trainers };
  }

  @GrpcMethod('TrainerService', 'GetTrainer')
  findOne({ trainerId }: { trainerId: string }) {
    return this.trainerGprcService.findById(trainerId);
  }

  @GrpcMethod('TrainerService', 'UpdateTrainer')
  update(rawData: any) {
    const dto = validateInputUpdate(rawData);
    const { trainerId } = rawData;

    return this.trainerGprcService.update(trainerId, dto);
  }

  @GrpcMethod('TrainerService', 'DeleteTrainer')
  async remove({ trainerId }: { trainerId: string }) {
    try {
      await this.trainerGprcService.delete(trainerId);
    } catch {
      return {
        success: false,
        message: 'Error: Trainer element could not be deleted',
      };
    }
    return { success: true, message: 'Trainer deleted successfully' };
  }
}
