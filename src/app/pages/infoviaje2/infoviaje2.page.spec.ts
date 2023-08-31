import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Infoviaje2Page } from './infoviaje2.page';

describe('Infoviaje2Page', () => {
  let component: Infoviaje2Page;
  let fixture: ComponentFixture<Infoviaje2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Infoviaje2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
