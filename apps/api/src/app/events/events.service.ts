import { CreateEventDto, UpdateEventDto } from '@coding-challenge/entities';
import { Injectable } from '@nestjs/common';
import { Connection, Between } from 'typeorm';
import { UsersService } from '../users/users.service';
import { EventRepository } from './events.repository';

@Injectable()
export class EventsService {
  private readonly eventRepository: EventRepository;

  constructor(
    private connection: Connection,
    private usersService: UsersService
  ) {
    this.eventRepository = this.connection.getCustomRepository(EventRepository);
  }

  async create(createEventDto: CreateEventDto) {
    return this.eventRepository.save({
      name: createEventDto.name,
      isOutside: createEventDto.isOutside,
      location: createEventDto.location,
      date: createEventDto.date,
      organizer: await this.usersService.findOne(createEventDto.organizerId),
    });
  }

  findAll(skip: number, take: number, from?: number, until?: number) {
    const today = new Date();
    const tomorrow = new Date();

    return this.eventRepository.findAndCount({
      where: {
        date: Between(
          from ?? today.setFullYear(today.getFullYear() - 1),
          until ?? tomorrow.setFullYear(tomorrow.getFullYear() + 1)
        ),
      },
      skip,
      take,
      relations: ['organizer', 'attendees'],
      order: {
        date: 'ASC',
      },
    });
  }

  findOne(id: string) {
    return this.eventRepository.findOneOrFail(id, {
      relations: ['organizer', 'attendees'],
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, {
      name: updateEventDto.name,
      isOutside: updateEventDto.isOutside,
      location: updateEventDto.location,
      date: updateEventDto.date,
      organizer: await this.usersService.findOne(updateEventDto.organizerId),
    });
  }

  remove(id: string) {
    return this.eventRepository.delete(id);
  }
}
