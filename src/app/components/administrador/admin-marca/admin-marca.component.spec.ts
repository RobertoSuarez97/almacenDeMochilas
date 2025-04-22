import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarcaComponent } from './admin-marca.component';

describe('AdminMarcaComponent', () => {
  let component: AdminMarcaComponent;
  let fixture: ComponentFixture<AdminMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
