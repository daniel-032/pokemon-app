import { IsOptional, MaxLength } from 'class-validator';

export class UpdateTypeDto {
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
