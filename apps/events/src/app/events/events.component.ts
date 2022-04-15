import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Event } from '@coding-challenge/entities';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events$ = new Observable<[Event[], number]>();
  pageSize = 3;

  params$ = new BehaviorSubject({
    skip: 0,
    take: this.pageSize,
  });

  displayedColumns: string[] = ['name'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  length = (size: number) => {
    return Math.ceil(size / this.pageSize);
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.params$.pipe(
      switchMap((params) => this.eventService.getAll(params.skip, params.take))
    );
  }

  changePage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.params$.next({
      skip: page.pageIndex * page.pageSize,
      take: page.pageSize,
    });
  }
}
