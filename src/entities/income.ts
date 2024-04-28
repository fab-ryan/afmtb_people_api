/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from './user';

@Entity()
export class Income extends BaseEntity {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  source!: string;

  @Column({ nullable: false })
  amount!: number;

  @Column({ nullable: false, default: 0 })
  balance!: number;

  @Column({ nullable: true })
  description!: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => User, user => user.incomes)
  user!: Omit<User, 'password'>;
}
