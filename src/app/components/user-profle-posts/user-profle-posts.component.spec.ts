import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProflePostsComponent } from './user-profle-posts.component';

describe('UserProflePostsComponent', () => {
  let component: UserProflePostsComponent;
  let fixture: ComponentFixture<UserProflePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProflePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProflePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
