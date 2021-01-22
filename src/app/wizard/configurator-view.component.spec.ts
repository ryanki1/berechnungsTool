import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorViewComponent } from './configurator-view.component';

describe('ConfiguratorViewComponent', () => {
  let component: ConfiguratorViewComponent;
  let fixture: ComponentFixture<ConfiguratorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguratorViewComponent ]
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
