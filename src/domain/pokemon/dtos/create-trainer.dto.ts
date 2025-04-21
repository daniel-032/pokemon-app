import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  name: string;

  @IsString()
  secondName: string;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  badges?: number;
}
