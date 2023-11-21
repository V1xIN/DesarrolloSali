import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PprincipalPage } from './pprincipal.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PprincipalPage', () => {
  let component: PprincipalPage;
  let fixture: ComponentFixture<PprincipalPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(PprincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
