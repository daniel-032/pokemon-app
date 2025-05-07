import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PokemonModel } from './pokemon.model'; // Asegúrate de crear también el modelo GraphQL del Pokémon

@ObjectType()
export class TrainerModel {
  @Field(() => ID)
  trainerId: string;

  @Field()
  name: string;

  @Field()
  secondName: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  region?: string;

  @Field(() => Int)
  badges: number;

  @Field(() => [PokemonModel], { nullable: true })
  pokemons?: PokemonModel[];
}
