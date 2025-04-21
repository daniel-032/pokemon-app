import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TrainerService } from '../services/trainer.service';
import { CreateTrainerDto } from '../dtos/create-trainer.dto';
import { UpdateTrainerDto } from '../dtos/update-trainer.dto';

@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  create(@Body() dto: CreateTrainerDto) {
    return this.trainerService.create(dto);
  }

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') trainerId: string) {
    return this.trainerService.findById(trainerId);
  }

  @Put(':id')
  update(@Param('id') trainerId: string, @Body() dto: UpdateTrainerDto) {
    return this.trainerService.update(trainerId, dto);
  }

  @Delete(':id')
  remove(@Param('id') trainerId: string) {
    return this.trainerService.delete(trainerId);
  }

  @Get(':id/pokemons')
  getPokemons(@Param('id') trainerId: string) {
    return this.trainerService.getTrainerPokemons(trainerId);
  }
}
