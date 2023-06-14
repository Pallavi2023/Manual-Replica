import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditOperatorComponent } from './create-edit-operator.component';

describe('CreateEditOperatorComponent', () => {
  let component: CreateEditOperatorComponent;
  let fixture: ComponentFixture<CreateEditOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditOperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
