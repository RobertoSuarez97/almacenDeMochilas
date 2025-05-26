import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarCompraComponent } from './procesar-compra.component';

describe('ProcesarCompraComponent', () => {
  let component: ProcesarCompraComponent;
  let fixture: ComponentFixture<ProcesarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesarCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
