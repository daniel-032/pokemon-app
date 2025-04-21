import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Type } from './type.entity';
import { Trainer } from './trainer.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('uuid', { name: 'pokemon_id' })
  pokemonId: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true
  })
  name: string;

  @Column('smallint', { default: 1 })
  level: number;

  @ManyToOne(() => Type, (type) => type.pokemons)
  @JoinColumn({name: 'type_id'})
  type: Type;

  @ManyToOne(() => Trainer, (trainer) => trainer.pokemons, { nullable: true })
  @JoinColumn({name: 'trainer_id'})
  trainer: Trainer;

  @Column('smallint', { default: 0 })
  attack: number;

  @Column('smallint', { default: 0 })
  defense: number;

  @Column('smallint', { default: 0 })
  speed: number;

  @Column('bool', { default: false, name: 'is_legendary' })
  isLegendary: boolean;
}
