import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainerRepository } from '../../repositories/trainer.repository';
import { CreateTrainerDto } from '../../dtos/create-trainer.dto';
import { UpdateTrainerDto } from '../../dtos/update-trainer.dto';
import { TrainerGPRC } from '../../interfaces/trainer.grpc.interface';
import { Trainer } from 'src/domain/pokemon/entities/trainer.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TrainerGrpcService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  async create(dto: CreateTrainerDto) {
    const trainer = this.trainerRepository.create(dto);
    const sanitizedTrainer = await this.trainerRepository.save(trainer);
    return this.sanitizeTrainerData(sanitizedTrainer);
  }

  async findAll() {
    const trainersDB = await this.trainerRepository.findAll();
    const trainers = this.sanitizeTrainerListData(trainersDB);
    return trainers;
  }

  async findById(trainerId: string) {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) throw new RpcException('Trainer not found');
    return this.sanitizeTrainerData(trainer);
  }

  async update(trainerId: string, dto: UpdateTrainerDto) {
    await this.trainerRepository.update(trainerId, dto);
    return this.findById(trainerId);
  }

  delete(trainerId: string) {
    return this.trainerRepository.delete(trainerId);
  }

  private sanitizeTrainerListData(trainersDB: Array<Trainer>): TrainerGPRC[] {
    let trainers: TrainerGPRC[] = [];

    trainersDB.map((trainer) => {
      trainers.push(this.sanitizeTrainerData(trainer));
    });

    return trainers;    
  }

  private sanitizeTrainerData(trainerDB: Trainer): TrainerGPRC {
    const minTrainerAge = 10;
    const defaultRegion = 'kanto';

    let trainer: TrainerGPRC = {
        trainerId: trainerDB.trainerId,
        age: trainerDB.age || minTrainerAge,
        badges: trainerDB.badges,
        name: trainerDB.name,
        region: trainerDB.region || defaultRegion,
        secondName: trainerDB.secondName
    }
    
    return trainer;
  }
}
