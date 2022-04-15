import { Event } from '@coding-challenge/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
