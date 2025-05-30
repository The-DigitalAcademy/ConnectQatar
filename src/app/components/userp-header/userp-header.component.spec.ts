import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpHeaderComponent } from './userp-header.component';

describe('UserpHeaderComponent', () => {
  let component: UserpHeaderComponent;
  let fixture: ComponentFixture<UserpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserpHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
