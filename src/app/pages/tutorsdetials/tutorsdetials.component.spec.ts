import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsdetialsComponent } from './tutorsdetials.component';

describe('TutorsdetialsComponent', () => {
  let component: TutorsdetialsComponent;
  let fixture: ComponentFixture<TutorsdetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorsdetialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorsdetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
