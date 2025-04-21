import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  @Max(100)
  level: number;

  @IsUUID()
  typeId: string;

  @IsOptional()
  @IsInt()
  attack?: number;

  @IsOptional()
  @IsInt()
  defense?: number;

  @IsOptional()
  @IsInt()
  speed?: number;

  @IsOptional()
  @IsBoolean()
  isLegendary?: boolean;
}
