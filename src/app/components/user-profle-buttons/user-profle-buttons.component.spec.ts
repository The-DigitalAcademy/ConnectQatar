import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfleButtonsComponent } from './user-profle-buttons.component';

describe('UserProfleButtonsComponent', () => {
  let component: UserProfleButtonsComponent;
  let fixture: ComponentFixture<UserProfleButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfleButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfleButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
