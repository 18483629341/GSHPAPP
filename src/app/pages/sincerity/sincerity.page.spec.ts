import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SincerityPage } from './sincerity.page';

describe('SincerityPage', () => {
  let component: SincerityPage;
  let fixture: ComponentFixture<SincerityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincerityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincerityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
