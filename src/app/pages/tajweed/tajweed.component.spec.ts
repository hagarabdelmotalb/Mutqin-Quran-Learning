import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajweedComponent } from './tajweed.component';

describe('TajweedComponent', () => {
  let component: TajweedComponent;
  let fixture: ComponentFixture<TajweedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TajweedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TajweedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
