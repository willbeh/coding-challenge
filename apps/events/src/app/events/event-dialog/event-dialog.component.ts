import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '@coding-challenge/entities';
import { Observable } from 'rxjs';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class EventDialogComponent implements OnInit {
  event$ = new Observable<Event>();

  constructor(
    private eventService: EventService,
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string }
  ) {}

  ngOnInit(): void {
    this.event$ = this.eventService.getOne(this.data.eventId);
  }
}
