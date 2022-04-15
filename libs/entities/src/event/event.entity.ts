import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  isOutside: boolean;

  @Column()
  location: string;

  @Column()
  date: Date;

  @ManyToMany(() => User)
  @JoinTable()
  attendees: User[];

  @ManyToOne(() => User)
  public organizer: User;
}
