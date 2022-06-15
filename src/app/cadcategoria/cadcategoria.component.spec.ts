import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadcategoriaComponent } from './cadcategoria.component';

describe('CadcategoriaComponent', () => {
  let component: CadcategoriaComponent;
  let fixture: ComponentFixture<CadcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
