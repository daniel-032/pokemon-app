import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TypeModel } from './type.model'; // Asegúrate de definir este también
import { TrainerModel } from './trainer.model'; // Ya lo tienes

@ObjectType()
export class PokemonModel {
  @Field(() => ID)
  pokemonId: string;

  @Field()
  name: string;

  @Field(() => Int)
  level: number;

  @Field(() => TypeModel)
  type: TypeModel;

  @Field(() => TrainerModel, { nullable: true })
  trainer?: TrainerModel;

  @Field(() => Int)
  attack: number;

  @Field(() => Int)
  defense: number;

  @Field(() => Int)
  speed: number;

  @Field()
  isLegendary: boolean;
}
