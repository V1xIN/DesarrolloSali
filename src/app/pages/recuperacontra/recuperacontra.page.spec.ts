import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperacontraPage } from './recuperacontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RecuperacontraPage', () => {
  let component: RecuperacontraPage;
  let fixture: ComponentFixture<RecuperacontraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, HttpClient, HttpHandler]
    }).compileComponents();
    fixture = TestBed.createComponent(RecuperacontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
