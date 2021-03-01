import {ChangeDetectionStrategy, Component} from '@angular/core';

import {Base} from './common/base';

@Component({
  selector: 'app-ls-tool',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends Base {
  title = 'berechnungsTool';

  constructor() {
    super();
  }


}
