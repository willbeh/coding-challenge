import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '@coding-challenge/entities';
import { Observable } from 'rxjs';
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
    public dialogRef: MatDialogRef<EventPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string }
  ) {}

  ngOnInit(): void {
    this.event$ = this.eventService.getOne(this.data.eventId);
  }
}
