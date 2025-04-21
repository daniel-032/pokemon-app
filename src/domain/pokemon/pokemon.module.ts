import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { TrainerRepository } from './repositories/trainer.repository';
import { TrainerService } from './services/trainer.service';
import { TrainerController } from './controllers/trainer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainerService, TrainerRepository],
  controllers: [TrainerController],
})
export class PokemonModule {}
