import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInfoPage } from './base-info.page';

describe('BaseInfoPage', () => {
  let component: BaseInfoPage;
  let fixture: ComponentFixture<BaseInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
