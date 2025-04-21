import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { TrainerRepository } from './repositories/trainer.repository';
import { TrainerService } from './services/trainer.service';
import { TrainerController } from './controllers/trainer.controller';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';
import { Type } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer, Pokemon, Type])],
  providers: [TrainerService, TrainerRepository, PokemonService],
  controllers: [TrainerController, PokemonController],
})
export class PokemonModule {}
