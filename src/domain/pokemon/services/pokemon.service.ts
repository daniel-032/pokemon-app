import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { CreatePokemonDto } from '../dtos/create-pokemon.dto';
import { UpdatePokemonDto } from '../dtos/update-pokemon.dto';
import { Type } from '../entities/type.entity';
import { UpdatePokemonStateDto } from '../dtos/update-pokemon-state.dto';
import { Trainer } from '../entities/trainer.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,

    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const type = await this.typeRepository.findOne({
      where: { typeId: createPokemonDto.typeId },
    });

    if (!type) {
      throw new BadRequestException('Invalid pokemon type');
    }

    const pokemon = this.pokemonRepository.create({
      ...createPokemonDto,
      type,
    });

    return await this.pokemonRepository.save(pokemon);
  }

  async findAll(typeName?: string, wild?: boolean): Promise<Pokemon[]> {
    const query = this.pokemonRepository
      .createQueryBuilder('pokemon')
      .leftJoinAndSelect('pokemon.type', 'type')
      .leftJoinAndSelect('pokemon.trainer', 'trainer');

    if (typeName) {
      query.andWhere('LOWER(type.name) = LOWER(:typeName)', { typeName });
    }

    if (wild) {
      query.andWhere('pokemon.trainer IS NULL');
    }

    return query.getMany();
  }

  async updateLevel(id: string, dto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId: id },
      relations: ['trainer'],
    });

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    pokemon.level = dto.level;

    return await this.pokemonRepository.save(pokemon);
  }

  async updateState(id: string, dto: UpdatePokemonStateDto): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId: id },
      relations: ['trainer'],
    });

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    if (pokemon.trainer) throw new BadRequestException('Pokemon has a trainer');

    const trainer = await this.trainerRepository.findOne({
      where: { trainerId: dto.trainerId },
    });

    if (!trainer) throw new NotFoundException('Trainer not found');

    pokemon.trainer = trainer;

    return await this.pokemonRepository.save(pokemon);
  }

  async remove(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId: id },
      relations: ['trainer'],
    });

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    if (pokemon.trainer) {
      throw new BadRequestException('Cannot remove pokemon with trainer');
    }

    await this.pokemonRepository.remove(pokemon);
  }

  async findOne(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId: id },
      relations: ['type', 'trainer'],
    });

    if (!pokemon) throw new NotFoundException('Pokemon not foun');
    return pokemon;
  }

  async updateStateToFree(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId: id },
      relations: ['trainer'],
    });

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    if (!pokemon.trainer)
      throw new NotFoundException('Pokemon does not have a trainer');

    pokemon.trainer = null;

    return await this.pokemonRepository.save(pokemon);
  }

  async updateLevelToUp(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { pokemonId: id },
    });

    if (!pokemon) throw new NotFoundException('Pokemon not found');

    const maxLevelPokemon = 100;

    if (pokemon.level == maxLevelPokemon)
      throw new BadRequestException('Pokemon is on the max level');

    pokemon.level = ++pokemon.level;

    return await this.pokemonRepository.save(pokemon);
  }
}
