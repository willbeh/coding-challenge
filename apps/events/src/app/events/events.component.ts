import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event } from '@coding-challenge/entities';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events$ = new Observable<[Event[], number]>();
  pageSize = 3;
  from?: Date;
  to?: Date;

  refresh$ = new BehaviorSubject<boolean>(true);
  params$ = new BehaviorSubject<{
    skip: number;
    take: number;
    from?: Date;
    to?: Date;
  }>({
    skip: 0,
    take: this.pageSize,
  });

  displayedColumns: string[] = [
    'name',
    'isOutside',
    'location',
    'date',
    'organizer',
    'attendees',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  length = (size: number) => {
    return Math.ceil(size / this.pageSize);
  };

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.events$ = this.refresh$.pipe(
      switchMap(() => this.params$),
      switchMap((params) =>
        this.eventService.getAll(
          params.skip,
          params.take,
          params.from,
          params.to
        )
      )
    );
  }

  changePage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.params$.next({
      skip: page.pageIndex * page.pageSize,
      take: page.pageSize,
      from: this.from,
      to: this.to,
    });
  }

  reload() {
    this.refresh$.next(true);
  }

  delete(event: Event) {
    if (confirm('Press a button!')) {
      this.eventService
        .delete(event.id as string)
        .pipe(
          tap(() => {
            this.snackBar.open(`${event.name} deleted`, '', {
              duration: 2000,
            });
            this.refresh$.next(true);
          })
        )
        .subscribe();
    }
  }

  filter(data: { to?: Date; from?: Date }) {
    console.log(data);
    this.from = data.from;
    this.to = data.to;
    this.params$.next({
      skip: 0,
      take: this.pageSize,
      from: data.from,
      to: data.to,
    });
  }
}
