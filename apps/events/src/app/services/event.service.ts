import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '@coding-challenge/entities';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  getAll(skip: number, take: number): Observable<[Event[], number]> {
    return this.http.get<[Event[], number]>(
      `/api/events?skip=${skip}&take=${take}`
    );
  }

  getOne(id: number): Observable<Event> {
    return this.http.get<Event>(`/api/events/${id}`);
  }
}
