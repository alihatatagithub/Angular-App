import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManyEmployeeComponent } from './delete-many-employee.component';

describe('DeleteManyEmployeeComponent', () => {
  let component: DeleteManyEmployeeComponent;
  let fixture: ComponentFixture<DeleteManyEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManyEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteManyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
