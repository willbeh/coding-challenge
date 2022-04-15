import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@Directive({
  selector: '[appEventView]',
})
export class EventViewDirective {
  @Input() appEventView!: string;

  constructor(private dialog: MatDialog) {}

  @HostListener('click') onMouseEnter() {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '600px',
      data: { eventId: this.appEventView },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
