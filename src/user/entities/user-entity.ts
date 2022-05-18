import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  telphone: string;
}
