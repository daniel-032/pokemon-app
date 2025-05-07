import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PokemonModel } from './pokemon.model'; // Asegúrate de tenerlo ya creado

@ObjectType()
export class TypeModel {
  @Field(() => ID)
  typeId: string;

  @Field()
  name: string;

  @Field(() => [PokemonModel], { nullable: true })
  pokemons?: PokemonModel[];
}
