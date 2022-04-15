import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EventPageComponent } from './event-page/event-page.component';
import { EventService } from '../services/event.service';

@NgModule({
  declarations: [EventsComponent, EventPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EventsComponent },
      { path: ':id', component: EventPageComponent },
    ]),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [EventService],
})
export class EventsModule {}
