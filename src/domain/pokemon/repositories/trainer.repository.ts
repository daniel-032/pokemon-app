import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from '../../pokemon/entities/trainer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainerRepository {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  create(data: Partial<Trainer>) {
    return this.trainerRepository.create(data);
  }

  save(trainer: Trainer) {
    return this.trainerRepository.save(trainer);
  }

  findAll() {
    return this.trainerRepository.find();
  }

  findById(trainerId: string) {
    return this.trainerRepository.findOne({
      where: { trainerId },
      relations: ['pokemons'],
    });
  }

  update(trainerId: string, data: Partial<Trainer>) {
    return this.trainerRepository.update(trainerId, data);
  }

  delete(trainerId: string) {
    return this.trainerRepository.delete(trainerId);
  }
}
