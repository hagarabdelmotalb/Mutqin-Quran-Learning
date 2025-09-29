import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksessionComponent } from './booksession.component';

describe('BooksessionComponent', () => {
  let component: BooksessionComponent;
  let fixture: ComponentFixture<BooksessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
