import { TestBed } from '@angular/core/testing';

import { DBManagerService } from './dbmanager.service';

describe('DBManagerService', () => {
  let service: DBManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
