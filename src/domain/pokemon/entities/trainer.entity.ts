import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn('uuid', { name: 'trainer_id' })
  trainerId: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
    nullable: false,
    name: 'second_name',
  })
  secondName: string;

  @Column('smallint', { nullable: true })
  age: number;

  @Column({ length: 50, nullable: true })
  region: string;

  @Column('smallint', { default: 0 })
  badges: number;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.type, { nullable: true })
  pokemons: Pokemon[];
}
