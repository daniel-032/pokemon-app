import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainerRepository } from '../repositories/trainer.repository';
import { CreateTrainerDto } from '../dtos/create-trainer.dto';
import { UpdateTrainerDto } from '../dtos/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  async create(dto: CreateTrainerDto) {
    const trainer = this.trainerRepository.create(dto);
    return this.trainerRepository.save(trainer);
  }

  findAll() {
    return this.trainerRepository.findAll();
  }

  async findById(trainerId: string) {
    const trainer = await this.trainerRepository.findById(trainerId);
    if (!trainer) throw new NotFoundException('Trainer not found');
    return trainer;
  }

  async update(trainerId: string, dto: UpdateTrainerDto) {
    await this.trainerRepository.update(trainerId, dto);
    return this.findById(trainerId);
  }

  delete(trainerId: string) {
    return this.trainerRepository.delete(trainerId);
  }

  async getTrainerPokemons(trainerId: string) {
    const trainer = await this.findById(trainerId);
    return trainer.pokemons;
  }
}
