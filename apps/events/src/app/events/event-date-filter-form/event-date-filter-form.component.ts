import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-date-filter-form',
  templateUrl: './event-date-filter-form.component.html',
  styleUrls: ['./event-date-filter-form.component.scss'],
})
export class EventDateFilterFormComponent {
  form = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null),
  });

  @Output() filter = new EventEmitter();

  onSubmit() {
    this.filter.emit(this.form.value);
  }
}
