import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { EventPageComponent } from './event-page/event-page.component';
import { EventService } from '../services/event.service';
import { EventViewDirective } from './event-view.directive';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventPageComponent,
    EventViewDirective,
    EventDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EventsComponent },
      { path: ':id', component: EventPageComponent },
    ]),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [EventService],
})
export class EventsModule {}
