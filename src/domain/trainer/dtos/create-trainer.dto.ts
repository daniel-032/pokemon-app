import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

@InputType()
export class CreateTrainerDto {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  secondName: string;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(120)
  @Field(() => Int)
  age?: number;

  @IsOptional()
  @IsString()
  @Field()
  region?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Field(() => Int)
  badges?: number;
}
