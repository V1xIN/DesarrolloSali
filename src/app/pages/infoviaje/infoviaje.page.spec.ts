import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoviajePage } from './infoviaje.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('InfoviajePage', () => {
  let component: InfoviajePage;
  let fixture: ComponentFixture<InfoviajePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SQLite,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ /* mock params here */ }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
