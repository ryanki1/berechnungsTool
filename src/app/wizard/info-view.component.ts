import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Base} from '../common/base';
import {i18n} from '../../assets/translate';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoViewComponent extends Base implements OnInit {

  @Output() displayConfigurator: EventEmitter<void> = new EventEmitter<void>();

  readonly i18n = i18n;

  constructor(protected cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }

  showConfigurator(): void {
    this.displayConfigurator.emit();
  }

}
