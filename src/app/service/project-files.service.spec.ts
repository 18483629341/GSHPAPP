import { TestBed } from '@angular/core/testing';

import { ProjectFilesService } from './project-files.service';

describe('ProjectFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectFilesService = TestBed.get(ProjectFilesService);
    expect(service).toBeTruthy();
  });
});
