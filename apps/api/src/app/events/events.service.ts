import {
  CreateEventDto,
  EventData,
  UpdateEventDto,
  Weather,
} from '@coding-challenge/entities';
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
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    return this.eventRepository.findAndCount({
      where: {
        date: Between(
          from ? this.processDate(from) : today.getTime(),
          until ? this.processDate(until, 1) : nextYear.getTime()
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

  processDate(date: number, day = 0) {
    const tempDate = new Date(date);
    const newDate = new Date(
      `${tempDate.getFullYear()}-${
        tempDate.getMonth() + 1
      }-${tempDate.getDate()}`
    );

    newDate.setDate(newDate.getDate() + day);

    return newDate.getTime();
  }

  async findOne(id: string): Promise<EventData> {
    const event = await this.eventRepository.findOneOrFail(id, {
      relations: ['organizer', 'attendees'],
    });

    const eventData = {
      ...event,
      weather: this.getWeather(event.location),
      ...this.getVisaRequirements(event.location),
    };

    return eventData;
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

  getVisaRequirements(location: string) {
    if (!location.startsWith('CAN|')) {
      return {
        visaRequirements: 'Visa is required',
        proofOfVaccineRequired: true,
      };
    }
  }

  // service to get weather
  getWeather(_location: string): Weather {
    return {
      chanceOfRain: this.randomInteger(0, 100),
      temperatureInDegreesCelcius: this.randomInteger(15, 30),
    };
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
