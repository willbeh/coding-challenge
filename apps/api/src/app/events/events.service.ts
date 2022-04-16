import {
  CreateEventDto,
  Event,
  EventData,
  UpdateEventDto,
  Weather,
} from '@coding-challenge/entities';
import { Injectable } from '@nestjs/common';
import { Connection, Between } from 'typeorm';
import { UsersService } from '../users/users.service';
import { EventRepository } from './events.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  private readonly eventRepository: EventRepository;

  constructor(
    private connection: Connection,
    private usersService: UsersService,
    private httpService: HttpService
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
      weather: await this.getWeather(event),
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
  async getWeather(event: Event): Promise<Weather> {
    // return null if not outside
    if (!event.isOutside) {
      return null;
    }

    // return null if more than 7 days
    const dateDiff = this.dateDiffInDays(new Date(), new Date(event.date));
    if (dateDiff > 7) {
      return null;
    }

    // check if have weather key
    if (!process.env.WEATHER_API_KEY) {
      return null;
    }

    // check if have location
    if (event.location.indexOf('|') < 0) {
      return null;
    }

    try {
      const api: any = await firstValueFrom(
        this.httpService.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${event.location}&days=7&aqi=no&alerts=no`
        )
      );

      const day =
        api.data.forecast.forecastday[dateDiff > 0 ? dateDiff - 1 : 0];

      return {
        chanceOfRain: day.day.daily_chance_of_rain,
        temperatureInDegreesCelcius: day.day.maxtemp_c,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // a and b are javascript Date objects
  dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
