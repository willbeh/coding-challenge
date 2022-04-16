import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateEventDto,
  Event,
  EventData,
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
    until?: Date
  ): Observable<[Event[], number]> {
    return this.http.get<[Event[], number]>(
      `/api/events?skip=${skip}&take=${take}${
        from ? `&from=${from.getTime()}` : ''
      }${until ? `&until=${until.getTime()}` : ''}`
    );
  }

  getOne(id: string): Observable<EventData> {
    return this.http.get<EventData>(`/api/events/${id}`);
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
