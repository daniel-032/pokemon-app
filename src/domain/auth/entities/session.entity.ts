import { Entity, Index, Column, PrimaryColumn, DeleteDateColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Index()
  @Column('bigint')
  expiredAt: number;

  @Column('text')
  json: string;

  @DeleteDateColumn()
  destroyedAt?: Date;
}
