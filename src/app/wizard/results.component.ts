import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';

import {AppEnvironment, ResultForConfiguration, Solution} from '../../assets/model';
import {Base} from '../common/base';
import {Constants} from '../common/constants';
import {LinkSealService} from '../service/linkSeal.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResultsComponent extends Base implements OnInit {

  @Input() set configurationResults(result: ResultForConfiguration) {
    this.resultForConfiguration = result;
  }

  @Output() displayConfigurator: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected cd: ChangeDetectorRef,
              private location: Location,
              private linkSealService: LinkSealService) {
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
    this.displayConfigurator.emit();
  }

  showConfigurator(): void {
    this.linkSealService.configuratorInputs = null;
    this.displayConfigurator.emit();
  }

  isLimitOnSealingArea(solution: Solution): boolean {
    const limit = this.resultForConfiguration.clamping_ring >= solution.gespannteDicke - Constants.SEALING_AREA_LIMIT_BUFFER;
    return limit;
  }

}

