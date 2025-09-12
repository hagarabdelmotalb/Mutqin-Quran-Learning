import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorizationComponent } from './memorization.component';

describe('MemorizationComponent', () => {
  let component: MemorizationComponent;
  let fixture: ComponentFixture<MemorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
