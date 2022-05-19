import { HttpClientModule } from '@angular/common/http';
import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DataService } from '../service/data.service';

import { HomeComponent } from './home.component';

class FakeDataService {
  constructor() {}
  simulateCardGame(data: string[], url: string) {
    const mockHttpResponse: string[] = ['4T', '10S', '2C', '4H'];
    return of(mockHttpResponse);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const mockSnackbarMock = jasmine.createSpyObj(['openFromComponent']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatSnackBarModule, HttpClientModule,BrowserAnimationsModule],
      providers: [
        {
          provide: DataService,
          useValue: new FakeDataService(),
        },
        {
          provide: MatSnackBar,
          vseValue: mockSnackbarMock,
        },
        { provide: 'BASE_URL', useValue: 'http://localhost' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should test if the string is valid', () => {
    let data: string = '2C,4H,10S,4T';
    let response: boolean = component.validString(data);
    expect(response).toBeTruthy();
    data = 'P2';
    response = component.validString(data);
    expect(response).toBeFalsy();
  });

  it('should test if the web api call is taking place', () => {
    spyOn(component._matSnackBar, 'openFromComponent').and.callThrough();
    component.showDescriptiveErrorMessage();
    expect(component._matSnackBar.openFromComponent).toHaveBeenCalled();
  });
});
