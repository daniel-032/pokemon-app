import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn('uuid', { name: 'type_id' })
  typeId: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.type, { nullable: true })
  pokemons: Pokemon[];
}
