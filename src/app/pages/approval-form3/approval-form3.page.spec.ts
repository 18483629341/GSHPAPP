import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalForm3Page } from './approval-form3.page';

describe('ApprovalForm3Page', () => {
  let component: ApprovalForm3Page;
  let fixture: ComponentFixture<ApprovalForm3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalForm3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalForm3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
