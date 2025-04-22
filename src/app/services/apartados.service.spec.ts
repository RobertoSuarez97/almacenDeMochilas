import { TestBed } from '@angular/core/testing';

import { ApartadosService } from './apartados.service';

describe('ApartadosService', () => {
  let service: ApartadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
