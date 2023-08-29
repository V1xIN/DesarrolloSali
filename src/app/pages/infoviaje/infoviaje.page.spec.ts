import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoviajePage } from './infoviaje.page';

describe('InfoviajePage', () => {
  let component: InfoviajePage;
  let fixture: ComponentFixture<InfoviajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
