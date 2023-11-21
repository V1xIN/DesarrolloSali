import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddautoPage } from './addauto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AddautoPage', () => {
  let component: AddautoPage;
  let fixture: ComponentFixture<AddautoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AddautoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
