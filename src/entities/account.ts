/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import dotenv from 'dotenv';
import { User } from './user';

dotenv.config();

@Entity()
export class Account {
  private static defaultBalance = process.env.DEFAULT_BALANCE || '0';

  Account() {
    this.balance = parseInt(Account.defaultBalance.toString(), 10);
  }

  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  account_number!: string;

  @Column({ nullable: false })
  bank_name!: string;

  @Column({ nullable: false })
  bank_branch!: string;

  @Column({ nullable: true })
  balance!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToOne(() => User, user => user.account)
  user!: User;
}
