/* eslint-disable require-jsdoc */
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Profile {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/ryan-fab/image/upload/v1714336026/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail_olqkms.png',
  })
  profile_picture!: string;

  @Column({ nullable: true })
  age!: number;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: true, default: 'Rwanda' })
  country!: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToOne(() => User, user => user.profile)
  user!: User;
}
