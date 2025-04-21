import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeService } from '../services/type.service';
import { CreateTypeDto } from '../dtos/create-type.dto';
import { UpdateTypeDto } from '../dtos/update-type.dto';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.create(dto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto) {
    return this.typeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(id);
  }
}
