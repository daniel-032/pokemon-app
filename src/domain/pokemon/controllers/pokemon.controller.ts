import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreatePokemonDto } from '../dtos/create-pokemon.dto';
import { UpdatePokemonDto } from '../dtos/update-pokemon.dto';
import { UpdatePokemonStateDto } from '../dtos/update-pokemon-state.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query('type') typeName?: string, @Query('wild') wild?: string) {
    const isWild: boolean = wild == 'true';
    return this.pokemonService.findAll(typeName, isWild);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.updateLevel(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(id);
  }

  @Patch(':id/capture')
  putTrainer(
    @Param('id') id: string,
    @Body() updatePokemonStateDto: UpdatePokemonStateDto,
  ) {
    return this.pokemonService.updateState(id, updatePokemonStateDto);
  }

  @Patch(':id/free')
  updateToFree(@Param('id') id: string) {
    return this.pokemonService.updateStateToFree(id);
  }

  @Patch(':id/level-up')
  updateLevel(@Param('id') id: string) {
    return this.pokemonService.updateLevelToUp(id);
  }
}
