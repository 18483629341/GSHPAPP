import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPage } from './engineer.page';

describe('EngineerPage', () => {
  let component: EngineerPage;
  let fixture: ComponentFixture<EngineerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
