import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateTrainerDto } from '../dtos/create-trainer.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateTrainerDto } from '../dtos/update-trainer.dto';

export function validateInputCreate(data: any) {
  const dtoInstance = plainToInstance(CreateTrainerDto, data);
  const errors = validateSync(dtoInstance);
  if (errors.length > 0) {
    throw new RpcException('Error trying to create Trainer');
  }
  return dtoInstance;
}

export function validateInputUpdate(data: any) {
  const { trainerId } = data;
  if (!trainerId)
    throw new RpcException('Bad request exepction, trainerId was not found');

  const dtoInstance = plainToInstance(UpdateTrainerDto, data);
  const errors = validateSync(dtoInstance);
  if (errors.length > 0) {
    throw new RpcException('Error trying to update Trainer');
  }
  return dtoInstance;
}
