import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../pokemon/entities/trainer.entity';
import { TrainerRepository } from '../trainer/repositories/trainer.repository';
import { TrainerService } from '../trainer/services/trainer.service';
import { TrainerController } from '../trainer/controllers/trainer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainerService, TrainerRepository],
  controllers: [TrainerController],
})
export class TrainerModule {}
