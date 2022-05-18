import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({})
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('json')
  tags: string[];

  @Column('json')
  photoList: string[];

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;

  @Column()
  operator: string;

  // @JoinTable()
  // @ManyToMany(() => Rent, (rent) => rent.houseInfo, {
  //   cascade: true, // 级联插入
  // })
  // rents: [];
}
