import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  rentType: string;

  @Column()
  address: string;

  @Column('json')
  photoList: string[];

  @Column()
  tel: string;

  @Column()
  price: string;

  @Column({
    nullable: true,
  })
  content: string;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @Column({
    nullable: true,
  })
  operator: string;
}
