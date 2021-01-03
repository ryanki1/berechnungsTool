import { Component } from '@angular/core';

import * as _ from 'lodash';

import {i18n} from '../assets/translate';

export const AppEnvironment = {
  // Propagate that link seal module is used on a website.
  environment: 'website', // or 'app'
  // Propagate that link seal module is to be configured for a customer's context.
  context: 'neutral'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'berechnungsTool';
  resultViewVisible = true;
  infoViewVisible =  true;
  // Results section
  resultForConfiguration = {
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
    }, {
      mdls: 182.7098746695,
      adls: 200.7098746695,
      idls: 164.7098746695,
      lspro: 10,
      artNr: '2-025-00141',
      rfArtNr: null,
      nls: 14,
      gespannteDicke: 22.5,
      ungespannteDicke: 18,
      type: 300,
      adlsWarningClass: 'adlsWarningClass'
    }, {
      mdls: 182.7098746695,
      adls: 198.7098746695,
      idls: 166.7098746695,
      lspro: 20,
      artNr: '2-025-00186',
      rfArtNr: null,
      nls: 14,
      gespannteDicke: 20,
      ungespannteDicke: 16,
      type: 265,
      adlsWarningClass: ''
    }],
    sets: [],
    // KR added for compilation
    error: null,
    notices: [] // add 'DEVIATIONS' to show coloured deviation text at end
  };
  translate(key: string): string {
    return _.get( i18n, `${i18n.preferredLanguage}.${key}`);
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
}
