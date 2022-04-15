import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

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

  @ManyToOne(() => User)
  public organizer: User;
}
