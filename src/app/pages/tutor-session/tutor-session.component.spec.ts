import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSessionComponent } from './tutor-session.component';

describe('TutorSessionComponent', () => {
  let component: TutorSessionComponent;
  let fixture: ComponentFixture<TutorSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});