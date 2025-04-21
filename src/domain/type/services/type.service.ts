import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TypeRepository } from '../repositories/type.repository';
import { CreateTypeDto } from '../dtos/create-type.dto';
import { UpdateTypeDto } from '../dtos/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private readonly typeRepository: TypeRepository) {}

  async create(dto: CreateTypeDto) {
    const existing = await this.typeRepository.findByName(dto.name);
    if (existing) throw new BadRequestException('Type already exists');

    const type = this.typeRepository.create(dto);
    return this.typeRepository.save(type);
  }

  findAll() {
    return this.typeRepository.find();
  }

  async findOne(id: string) {
    const type = await this.typeRepository.findOne({ where: { typeId: id } });
    if (!type) throw new NotFoundException('Type not found');
    return type;
  }

  async update(id: string, dto: UpdateTypeDto) {
    const type = await this.findOne(id);
    this.typeRepository.merge(type, dto);
    return this.typeRepository.save(type);
  }

  async remove(id: string) {
    const type = await this.findOne(id);
    if (type.pokemons?.length) {
      throw new BadRequestException('Cannot delete a Type that is assigned to Pokémon');
    }
    return this.typeRepository.remove(type);
  }
}
