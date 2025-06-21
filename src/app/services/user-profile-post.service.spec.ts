import { TestBed } from '@angular/core/testing';

import { UserProfilePostService } from './user-profile-post.service';

describe('UserProfilePostService', () => {
  let service: UserProfilePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfilePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
