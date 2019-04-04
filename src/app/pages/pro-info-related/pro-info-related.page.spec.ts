import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProInfoRelatedPage } from './pro-info-related.page';

describe('ProInfoRelatedPage', () => {
  let component: ProInfoRelatedPage;
  let fixture: ComponentFixture<ProInfoRelatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProInfoRelatedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProInfoRelatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
