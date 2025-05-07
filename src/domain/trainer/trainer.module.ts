import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../pokemon/entities/trainer.entity';
import { TrainerRepository } from '../trainer/repositories/trainer.repository';
import { TrainerService } from '../trainer/services/trainer.service';
import { TrainerResolver } from './resolvers/trainer.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainerService, TrainerRepository, TrainerResolver],
  controllers: [],
})
export class TrainerModule {}
