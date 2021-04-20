import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRegistrationComponent } from './contract-registration.component';

describe('ContractRegistrationComponent', () => {
  let component: ContractRegistrationComponent;
  let fixture: ComponentFixture<ContractRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
