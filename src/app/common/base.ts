import * as _ from 'lodash';

import {i18n} from '../../assets/translate';
import {AppEnvironment, ResultForConfiguration} from '../../assets/model';

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
