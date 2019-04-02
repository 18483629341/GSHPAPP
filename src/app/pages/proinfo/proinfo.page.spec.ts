import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProinfoPage } from './proinfo.page';

describe('ProinfoPage', () => {
  let component: ProinfoPage;
  let fixture: ComponentFixture<ProinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
