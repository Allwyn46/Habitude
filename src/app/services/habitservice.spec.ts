import { TestBed } from '@angular/core/testing';

import { Habitservice } from './habitservice';

describe('Habitservice', () => {
  let service: Habitservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Habitservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
