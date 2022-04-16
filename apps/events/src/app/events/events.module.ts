import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EventService } from '../services/event.service';
import { EventViewDirective } from './event-view.directive';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventFormComponent } from './event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { EventEditDirective } from './event-edit.directive';
import { EventDateFilterFormComponent } from './event-date-filter-form/event-date-filter-form.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventViewDirective,
    EventEditDirective,
    EventDialogComponent,
    EventFormComponent,
    EventDateFilterFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EventsComponent }]),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [EventService, UserService],
})
export class EventsModule {}
