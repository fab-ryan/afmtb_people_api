/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile';
import { Income } from './income';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  @Unique('email', ['email'])
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToOne(type => Profile, profile => profile.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  profile!: Profile;

  @OneToMany(() => Income, income => income.user)
  @JoinColumn()
  incomes!: Income[];
}
