import { TestBed } from '@angular/core/testing';

import { SheikhsService } from './sheikhs.service';

describe('SheikhsService', () => {
  let service: SheikhsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheikhsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
