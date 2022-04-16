import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './event-form/event-form.component';

@Directive({
  selector: '[appEventEdit]',
})
export class EventEditDirective {
  @Input() appEventEdit?: string;
  @Output() saved = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  @HostListener('click') onMouseEnter() {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '600px',
      data: { eventId: this.appEventEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saved.emit(true);
      }
    });
  }
}
