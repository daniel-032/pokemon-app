import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { TrainerGrpcService } from '../../services/grpc/trainer.grpc.service';
import { TrainerGPRC } from '../../interfaces/trainer.grpc.interface';
import {
  validateInputCreate,
  validateInputUpdate,
} from '../../helpers/validation.helper';

@Controller('trainers')
export class TrainerGrpcController {
  constructor(private readonly trainerGrpcService: TrainerGrpcService) {}

  @GrpcMethod('TrainerService', 'CreateTrainer')
  create(rawData: any) {
    const dto = validateInputCreate(rawData);
    return this.trainerGrpcService.create(dto);
  }

  @GrpcMethod('TrainerService', 'ListTrainers')
  async findAll() {
    const trainers: TrainerGPRC[] = await this.trainerGrpcService.findAll();
    return { trainers };
  }

  @GrpcMethod('TrainerService', 'GetTrainer')
  findOne({ trainerId }: { trainerId: string }) {
    return this.trainerGrpcService.findById(trainerId);
  }

  @GrpcMethod('TrainerService', 'UpdateTrainer')
  update(rawData: any) {
    const dto = validateInputUpdate(rawData);
    const { trainerId } = rawData;

    return this.trainerGrpcService.update(trainerId, dto);
  }

  @GrpcMethod('TrainerService', 'DeleteTrainer')
  async remove({ trainerId }: { trainerId: string }) {
    try {
      await this.trainerGrpcService.delete(trainerId);
    } catch {
      return {
        success: false,
        message: 'Error: Trainer element could not be deleted',
      };
    }
    return { success: true, message: 'Trainer deleted successfully' };
  }
}
