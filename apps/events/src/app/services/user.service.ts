import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@coding-challenge/entities';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`/api/users`);
  }

  getOne(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
