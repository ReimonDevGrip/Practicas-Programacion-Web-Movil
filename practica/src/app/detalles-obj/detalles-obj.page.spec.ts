import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesObjPage } from './detalles-obj.page';

describe('DetallesObjPage', () => {
  let component: DetallesObjPage;
  let fixture: ComponentFixture<DetallesObjPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesObjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
