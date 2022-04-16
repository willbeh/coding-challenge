import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@coding-challenge/entities';
import { finalize, Observable, tap } from 'rxjs';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  users$ = new Observable<User[]>();
  id?: string;
  saving = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    isOutside: new FormControl(false, Validators.required),
    location: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    organizerId: new FormControl('', Validators.required),
  });

  constructor(
    private eventService: EventService,
    private userService: UserService,
    public dialogRef: MatDialogRef<EventDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string }
  ) {}

  ngOnInit(): void {
    if (this.data.eventId) {
      this.eventService
        .getOne(this.data.eventId)
        .pipe(
          tap((event) => {
            this.form.patchValue({
              ...event,
              date: new Date(event.date),
              organizerId: event.organizer.id,
            });
          })
        )
        .subscribe();
    }

    this.users$ = this.userService.getAll();
  }

  onSubmit() {
    this.saving = true;

    if (this.form.valid) {
      let service;
      const data = { ...this.form.value, date: this.form.value.date.getTime() };
      if (this.data.eventId) {
        service = this.eventService.update(this.data.eventId, data);
      } else {
        service = this.eventService.save(data);
      }
      service
        .pipe(
          tap((event) => {
            if (event === true) {
              this.dialogRef.close(true);
              this.snackBar.open(
                `Event ${this.form.get('name')?.value} saved`,
                'Close',
                {
                  duration: 2000,
                }
              );
            } else {
              this.snackBar.open('Error Saving', 'Close', {
                duration: 3000,
              });
            }
          }),
          finalize(() => (this.saving = false))
        )
        .subscribe();
    }
  }
}
