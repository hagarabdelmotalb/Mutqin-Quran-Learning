import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TahfizComponent } from './tahfiz.component';

describe('TahfizComponent', () => {
  let component: TahfizComponent;
  let fixture: ComponentFixture<TahfizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TahfizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TahfizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
