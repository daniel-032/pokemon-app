import { IsUUID } from 'class-validator';

export class UpdatePokemonStateDto {
  @IsUUID()
  trainerId: string;
}
