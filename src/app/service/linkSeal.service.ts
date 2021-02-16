import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Constants} from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class LinkSealService {

  private inputs: any;

  constructor(private http: HttpClient) {
  }

  getResults(context: string,
             wallSleeveTypeIdentifier: string,
             wallSleeveSize: string,
             carrierPipeTypeIdentifier: string,
             carrierPipeSize: string,
             productTypeIdentifier: string,
             materialTypeIdentifier: string,
             screwTypeIdentifier: string
  ): Observable<any> {
    if (Constants.MOCK_MODE) {
      return of({
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
      });
    } else {
      // TODO KR async http getResults call
      const url = '/api/link-seal/?action=solution&context=' + context
        + '&wallSleeveType=' + wallSleeveTypeIdentifier + '&wallSleeveSize=' + wallSleeveSize
        + '&carrierPipeType=' + carrierPipeTypeIdentifier + '&carrierPipeSize=' + carrierPipeSize
        + '&productType=' + productTypeIdentifier + '&materialType=' + materialTypeIdentifier
        + '&screwType=' + screwTypeIdentifier;
      return this.http.get(url, {responseType: 'json'});
    }
  }

  get configuratorInputs(): any {
    return this.inputs;
  }

  set configuratorInputs(value: any) {
    this.inputs = value;
  }
}
