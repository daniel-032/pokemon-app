import { IsInt, Min, Max } from 'class-validator';

export class UpdatePokemonDto {
  @IsInt()
  @Min(1)
  @Max(100)
  level: number;
}
