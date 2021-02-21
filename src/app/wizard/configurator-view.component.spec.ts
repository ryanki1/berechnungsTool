import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorViewComponent } from './configurator-view.component';
import {HttpClient} from '@angular/common/http';

describe('ConfiguratorViewComponent', () => {
  let component: ConfiguratorViewComponent;
  let fixture: ComponentFixture<ConfiguratorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguratorViewComponent ],
      providers: [
        {
          provide: HttpClient,
          useFactory: () => {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
