import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';
import { Type } from './entities/type.entity';
import { Trainer } from './entities/trainer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer, Pokemon, Type])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
