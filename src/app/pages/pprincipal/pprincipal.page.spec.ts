import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PprincipalPage } from './pprincipal.page';

describe('PprincipalPage', () => {
  let component: PprincipalPage;
  let fixture: ComponentFixture<PprincipalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PprincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
