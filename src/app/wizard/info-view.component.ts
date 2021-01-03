import {Component, OnInit} from '@angular/core';

import {AppComponent} from '../app.component';
import {i18n} from '../../assets/translate';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss']
})
export class InfoViewComponent extends AppComponent implements OnInit {

  readonly i18n = i18n;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
