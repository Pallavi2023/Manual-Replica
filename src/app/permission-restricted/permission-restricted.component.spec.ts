import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRestrictedComponent } from './permission-restricted.component';

describe('PermissionRestrictedComponent', () => {
  let component: PermissionRestrictedComponent;
  let fixture: ComponentFixture<PermissionRestrictedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionRestrictedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionRestrictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
