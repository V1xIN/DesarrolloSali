import { TestBed } from '@angular/core/testing';

import { UsocamaraService } from './usocamara.service';

describe('UsocamaraService', () => {
  let service: UsocamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsocamaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
