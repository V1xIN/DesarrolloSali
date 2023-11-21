import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddviajePage } from './addviaje.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AddviajePage', () => {
  let component: AddviajePage;
  let fixture: ComponentFixture<AddviajePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AddviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
