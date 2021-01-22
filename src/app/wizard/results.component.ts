import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {AppEnvironment} from '../../assets/model';
import {Base} from '../common/base';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResultsComponent extends Base implements OnInit {

  @Input() set configurationResults(result: any) {
    this.resultForConfiguration = result;
  }

  @Output() showConfiguration: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {

  }

  /**
   * Checks whether the app context is PSI
   * @returns {boolean}
   */
  isContextPSI(): boolean {
    return AppEnvironment.context === 'PSI';
  }

  /**
   * Checks whether the app context is neutral
   * @returns {boolean}
   */
  isContextNeutral(): boolean {
    return AppEnvironment.context === 'neutral';
  }

  /**
   * Checks whether the app context is R+F
   * @returns {boolean}
   */
  isContextRf(): boolean {
    return AppEnvironment.context === 'Rf';
  }

  /**
   * Checks whether the app context is TVG
   * @returns {boolean}
   */
  isContextTVG(): boolean {
    return AppEnvironment.context === 'TVG';
  }

  /**
   * Checks whether the inner diameter of a given solution is deviating from the inner diameter chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isInnerDiameterDeviating(solution): boolean { // 2020-07-02 changes no. 6.
    return (solution.adls > this.resultForConfiguration.inner_diameter + 1.5);
  }

  /**
   * Checks whether the outer diameter of a given solution is deviating from the outer diameter chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isOuterDiameterDeviating(solution): boolean { // 2020-07-02 changes no. 6
    return (solution.idls < this.resultForConfiguration.outer_diameter - 2);
  }

  /**
   * Tells whether the calculated configuration has solutions.
   * @returns {boolean}
   */
  /**
   * Tells whether the calculated configuration has solutions.
   * @returns {boolean}
   */
  hasResultSolutions(): boolean {
    if (this.resultForConfiguration
      && !this.resultForConfiguration.error
      && (this.resultForConfiguration.solutions.length > 0)) {
      return true;
    }
    return false;
  }

  /**
   * Tells whether the calculated configuration has sets.
   * @returns {boolean}
   */
  hasResultSets(): boolean {
    if (this.resultForConfiguration &&
      this.resultForConfiguration.sets &&
      (this.resultForConfiguration.sets.length > 0)
    ) {
      return true;
    }
    return false;
  }

  /**
   * Tells whether the calculated configuration has errors.
   * @returns {boolean}
   */
  hasResultErrors(): boolean {
    if (this.resultForConfiguration && (this.resultForConfiguration.error !== '')) {
      return true;
    }
    return false;
  }

  /**
   * Tells whether the calculated configuration has warnings.
   * @returns {boolean}
   */
  hasResultWarnings(): boolean {
    return (this.resultForConfiguration.notices.length > 0);
  }

  back(): void {
    this.showConfiguration.emit();
  }

  newConfiguration(): void {
    this.showConfiguration.emit();
  }

}

