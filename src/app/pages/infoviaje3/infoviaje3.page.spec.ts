import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Infoviaje3Page } from './infoviaje3.page';

describe('Infoviaje3Page', () => {
  let component: Infoviaje3Page;
  let fixture: ComponentFixture<Infoviaje3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Infoviaje3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
