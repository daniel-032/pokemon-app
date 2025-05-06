import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../pokemon/entities/trainer.entity';
import { TrainerRepository } from '../trainer/repositories/trainer.repository';
import { TrainerService } from '../trainer/services/trainer.service';
import { TrainerController } from '../trainer/controllers/trainer.controller';
import { TrainerGrpcController } from './controllers/grpc/trainer.grpc.controller';
import { TrainerGrpcService } from './services/grpc/trainer.grpc.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainerService, TrainerRepository, TrainerGrpcService],
  controllers: [TrainerController, TrainerGrpcController],
})
export class TrainerModule {}
