import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ResultsComponent} from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let BT_200_160_RESPONSE: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    BT_200_160_RESPONSE = {
      wall_sleeve_type: 'WALL_SLEEVE_TYPE_OTHER',
      inner_diameter: 200,
      carrier_pipe_type: 'CARRIER_PIPE_TYPE_OTHER',
      outer_diameter: 160,
      clamping_ring: 20,
      productLoc: 'Link-Seal S316',
      context: 'PSI',
      solutions: [{
        mdls: 183.02818455568,
        adls: 201.02818455568,
        idls: 165.02818455568,
        lspro: 10,
        artNr: '2-025-00187',
        rfArtNr: null,
        nls: 10,
        gespannteDicke: 22.5,
        ungespannteDicke: 18,
        type: 310,
        adlsWarningClass: 'adlsWarningClass'
      }],
      sets: [],
      // KR added for compilation
      error: null,
      notices: [] // add 'DEVIATIONS' to show coloured deviation text at end
    };
    component.resultForConfiguration = BT_200_160_RESPONSE;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('inner-Ø link seal is not highlighted', () => {
    component.resultForConfiguration.inner_diameter = 160;
    component.resultForConfiguration.outer_diameter = 130;
    component.resultForConfiguration.solutions[0].adls = 201.02818455568;
    component.resultForConfiguration.solutions[0].idls = 165.02818455568;
    fixture.detectChanges();
    const eleBlack = fixture.debugElement.query(By.css('.inner-diameter-mm')).nativeElement;
    const eleRed = fixture.debugElement.query(By.css('.inner-diameter-mm.red'));
    expect(eleBlack).toBeTruthy();
    expect(eleRed).toBeFalsy();
  });
  it('inner-Ø link seal is highlighted', () => {
    // value 2 (outer_diameter) - 2 > value 4 (solutions[0].idls)
    component.resultForConfiguration.inner_diameter = 160;
    component.resultForConfiguration.outer_diameter = 130;
    component.resultForConfiguration.solutions[0].adls = 201.02818455568;
    component.resultForConfiguration.solutions[0].idls = 127.0;
    fixture.detectChanges();
    const eleRed = fixture.debugElement.query(By.css('.inner-diameter-mm.red'));
    expect(eleRed).toBeTruthy();
  });
  it('outer-Ø link seal is not highlighted', () => {
    component.resultForConfiguration.inner_diameter = 200;
    component.resultForConfiguration.outer_diameter = 160;
    component.resultForConfiguration.solutions[0].adls = 201.02818455568;
    component.resultForConfiguration.solutions[0].idls = 165.02818455568;
    fixture.detectChanges();
    const eleBlack = fixture.debugElement.query(By.css('.outer-diameter-mm')).nativeElement;
    const eleRed = fixture.debugElement.query(By.css('.outer-diameter-mm.red'));
    expect(eleBlack).toBeTruthy();
    expect(eleRed).toBeFalsy();
  });
  it('outer-Ø link seal is highlighted', () => {
    // value 1 (inner_diameter) + 1,5 < value 3 (solutions[0].adls)
    component.resultForConfiguration.inner_diameter = 200;
    component.resultForConfiguration.outer_diameter = 160;
    component.resultForConfiguration.solutions[0].adls = 202.0;
    component.resultForConfiguration.solutions[0].idls = 165.02818455568;
    fixture.detectChanges();
    const eleRed = fixture.debugElement.query(By.css('.outer-diameter-mm.red'));
    expect(eleRed).toBeTruthy();
  });
  describe('extended information', () => {
    it('"Required Wall Thickness" not displayed', () => {
      expectInfoExtensionsFalsy('mmRequiredWallThickness');
    });
    it('"Required Wall Thickness displayed"', () => {
      component.resultForConfiguration.solutions[0].mmRequiredWallThickness = 100;
      expectInfoExtensionsTruthy('mmRequiredWallThickness');
    });
    it('"Recommended Sleeve Length" not displayed', () => {
      expectInfoExtensionsFalsy('mmRecommendedSleeveLength');
    });
    it('"Recommended Sleeve Length" displayed', () => {
      component.resultForConfiguration.solutions[0].mmRecommendedSleeveLength = 150;
      expectInfoExtensionsTruthy('mmRecommendedSleeveLength');
    });
  });

  function expectInfoExtensionsFalsy(extProperty: string): void {
    expect(component.resultForConfiguration.solutions[0].hasOwnProperty(extProperty)).toBeFalsy();
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css(`[data-test-${extProperty}]`));
    expect(ele).toBeFalsy();
  }

  function expectInfoExtensionsTruthy(extProperty: string): void {
    expect(component.resultForConfiguration.solutions[0].hasOwnProperty(extProperty)).toBeTruthy();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`[data-test-${extProperty}]`))).toBeTruthy();
  }
});
