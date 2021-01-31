import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfiguratorComponent } from './button-configurator.component';

describe('ButtonConfiguratorComponent', () => {
  let component: ButtonConfiguratorComponent;
  let fixture: ComponentFixture<ButtonConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
