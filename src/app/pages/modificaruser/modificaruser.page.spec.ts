import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaruserPage } from './modificaruser.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificaruserPage', () => {
  let component: ModificaruserPage;
  let fixture: ComponentFixture<ModificaruserPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificaruserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
