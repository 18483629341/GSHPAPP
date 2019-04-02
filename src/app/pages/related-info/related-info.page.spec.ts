import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedInfoPage } from './related-info.page';

describe('RelatedInfoPage', () => {
  let component: RelatedInfoPage;
  let fixture: ComponentFixture<RelatedInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
