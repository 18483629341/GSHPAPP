import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartakeproPage } from './partakepro.page';

describe('PartakeproPage', () => {
  let component: PartakeproPage;
  let fixture: ComponentFixture<PartakeproPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartakeproPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartakeproPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
