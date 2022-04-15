import { CreateEventDto, UpdateEventDto } from '@coding-challenge/entities';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { EventRepository } from './events.repository';

@Injectable()
export class EventsService {
  private readonly eventRepository: EventRepository;

  constructor(private connection: Connection) {
    this.eventRepository = connection.getCustomRepository(EventRepository);
  }

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll(skip, take) {
    return this.eventRepository.findAndCount({
      skip,
      take,
    });
  }

  findOne(id: string) {
    return this.eventRepository.findOneOrFail(id);
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
