import * as _ from 'lodash';

import {AppEnvironment, ResultForConfiguration} from '../../assets/model';
import {Constants} from './constants';
import {i18n} from '../../assets/translate';

export class Base {
  /**
   * the Result - to be provided by the LinkSealService.
   * @type {Array}
   */
  resultForConfiguration: ResultForConfiguration = null;
  configuratorViewVisible = true;
  resultViewVisible = false;
  infoViewVisible = false;

  constructor() {
  }

  // Results section
  translate(key: string): string {
    return _.get(i18n, `${i18n.preferredLanguage}.${key}`);
  }

  /**
   * Tells whether the angular app is running inside an app (container) on a mobile device.
   * @returns {boolean}
   */
  isRunningInApp(): boolean {
    return AppEnvironment.environment === 'app';
  }

  backToMenu(): void {

  }

  /**
   * -----------------------------------------------------------
   * VIEW TOGGLES AND HELPERS
   * -----------------------------------------------------------
   */

  showConfigurator(): void {
    this.resetResult();
    this.resultViewVisible = false;
    this.infoViewVisible = false;
    this.configuratorViewVisible = true;
  }

  showResult(): void {
    this.configuratorViewVisible = false;
    this.infoViewVisible = false;
    this.resultViewVisible = true;
  }

  showInfo(): void {
    this.configuratorViewVisible = false;
    this.resultViewVisible = false;
    this.infoViewVisible = true;
  }

  /**
   * Checks whether the inner diameter of a given solution is deviating from the inner diameter chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isInnerDiameterDeviating(solution): boolean { // 2020-07-02 changes no. 6.
    return (solution.adls > this.resultForConfiguration.inner_diameter + Constants.OUTER_TOLERANCE);
  }

  /**
   * Checks whether the outer diameter of a given solution is deviating from the outer diameter chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isOuterDiameterDeviating(solution): boolean { // 2020-07-02 changes no. 6
    return (solution.idls < this.resultForConfiguration.outer_diameter + Constants.INNER_TOLERANCE);
  }

  /**
   * Checks whether one of the diameters of a given solution is deviating from the diameters chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isDiameterDeviating(solution): boolean {
    return (this.isInnerDiameterDeviating(solution) || this.isOuterDiameterDeviating(solution));
  }

  /**
   * ----------------------------------------------
   * RESULT MODEL
   * ----------------------------------------------
   */

  /**
   * resets the result
   */
  resetResult(): void {
    this.resultForConfiguration = null;
  }

  /**
   * -----------------------------------------------------------
   * HANDLER FOR NAVIGATION BUTTON CLICKS
   * -----------------------------------------------------------
   */

  back(): void {
    this.showConfigurator();
  }

  newConfiguration(): void {
    this.showConfigurator(); // TODO KR or reload to trigger initLinkSealApp()
  }

  /**
   * Tells whether the angular app is running on a website.
   * @returns {boolean}
   */
  isRunningOnWebsite(): boolean {
    return AppEnvironment.environment === 'website';
  }

}
