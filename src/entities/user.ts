/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

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
}
