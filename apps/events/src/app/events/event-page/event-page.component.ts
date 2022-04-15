import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '@coding-challenge/entities';
import { Observable, switchMap } from 'rxjs';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  event$ = new Observable<Event>();
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.event$ = this.route.params.pipe(
      switchMap((params) => this.eventService.getOne(params['id']))
    );
  }
}
