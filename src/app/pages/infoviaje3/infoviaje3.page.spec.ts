import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Infoviaje3Page } from './infoviaje3.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Infoviaje3Page', () => {
  let component: Infoviaje3Page;
  let fixture: ComponentFixture<Infoviaje3Page>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(Infoviaje3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
