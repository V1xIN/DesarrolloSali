import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaruserPage } from './modificaruser.page';

describe('ModificaruserPage', () => {
  let component: ModificaruserPage;
  let fixture: ComponentFixture<ModificaruserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificaruserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
