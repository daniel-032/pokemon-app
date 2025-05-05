import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    length: 100,
    nullable: false,
  })
  @IsEmail({}, { message: 'Invalid data: Email is not valid' })
  email: string;

  @Column({
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true
  })
  token_session?: string;
}
