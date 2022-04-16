import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDateFilterFormComponent } from './event-date-filter-form.component';

describe('EventDateFilterFormComponent', () => {
  let component: EventDateFilterFormComponent;
  let fixture: ComponentFixture<EventDateFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDateFilterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDateFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
