import { TestBed } from '@angular/core/testing';

import { FirebaseClubService } from './club.service';

describe('FirebaseClubService', () => {
  let service: FirebaseClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
