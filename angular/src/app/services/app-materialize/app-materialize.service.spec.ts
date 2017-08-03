import { TestBed, inject } from '@angular/core/testing';

import { AppMaterializeService } from './app-materialize.service';

describe('AppMaterializeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppMaterializeService]
    });
  });

  it('should be created', inject([AppMaterializeService], (service: AppMaterializeService) => {
    expect(service).toBeTruthy();
  }));
});
