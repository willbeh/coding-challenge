import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateEventDto,
  Event,
  UpdateEventDto,
} from '@coding-challenge/entities';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  getAll(
    skip: number,
    take: number,
    from?: Date,
    to?: Date
  ): Observable<[Event[], number]> {
    if (from) {
      const num = from.getTime();
      console.log('num', num, new Date(num));
    }

    return this.http.get<[Event[], number]>(
      `/api/events?skip=${skip}&take=${take}${
        from ? `&from=${from.getTime()}` : ''
      }${to ? `&to=${to.getTime()}` : ''}`
    );
  }

  getOne(id: string): Observable<Event> {
    return this.http.get<Event>(`/api/events/${id}`);
  }

  save(event: CreateEventDto) {
    return this.http.post('/api/events', event);
  }

  update(id: string, event: UpdateEventDto) {
    return this.http.put(`/api/events/${id}`, event);
  }

  delete(id: string) {
    return this.http.delete(`/api/events/${id}`);
  }
}
