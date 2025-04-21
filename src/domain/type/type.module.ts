import { Module } from '@nestjs/common';
import { TypeService } from './services/type.service';
import { TypeController } from './controllers/type.controller';
import { TypeRepository } from './repositories/type.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from '../pokemon/entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService, TypeRepository],
})
export class TypeModule {}
