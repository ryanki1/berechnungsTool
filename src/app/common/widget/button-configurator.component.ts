import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

import * as _ from 'lodash';

import {Base} from '../base';
import {LinkSealModel} from '../../../assets/model';


@Component({
  selector: 'app-button-configurator',
  templateUrl: './button-configurator.component.html',
  styleUrls: ['./button-configurator.component.scss']
})
export class ButtonConfiguratorComponent extends Base implements OnInit {

  @Output() selectionMade: EventEmitter<{
    productType: string,
    materialType: string,
    screwType: string
  }> = new EventEmitter<{
    productType: string,
    materialType: string,
    screwType: string
  }>();

  public linkSealModel = LinkSealModel;
  private selections: {
    productType: string,
    materialType: string,
    screwType: string
  } = {
    productType: undefined,
    materialType: undefined,
    screwType: undefined
  };

  @HostListener('click', ['$event.target'])
  onClick(ele): void {
    if (ele.className === 'mat-button-wrapper') {
      if (ele.parentElement.hasAttribute('mat-raised-button') ||
        ele.parentElement.hasAttribute('mat-flat-button')) {
        this.selectionMade.emit(this.selections);
      }
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    // Overwrite here any initial product/material/screw -type settings
    const productType = _.find(this.linkSealModel.productTypes, {button: 'flat'});
    const materialType = _.find(productType.materialTypes, {button: 'flat'});
    const screwType = _.find(productType.screwTypes, {button: 'flat'});
    this.selections.productType = productType && productType.identifier;
    this.selections.materialType = materialType && materialType.identifier;
    this.selections.screwType = screwType && screwType.identifier;
    this.selectionMade.emit(this.selections);
  }

  raise(productType: any): void {
    let abort = false;
    this.linkSealModel.productTypes.forEach((pType) => {
      if (_.isEqual(pType, productType)) {
        pType.materialTypes.forEach((mType) => {
          if (mType.button === 'flat') {
            if (!(pType.materialTypes.length === 1)) {
              abort = true;
              return;
            } else {
              this.selections.materialType = undefined;
            }
          }
          mType.button = 'stroked';
        });
        if (!abort) {
          pType.screwTypes.forEach((sType) => {
            if (pType.screwTypes.length === 1) {
              this.selections.screwType = undefined;
            }
            sType.button = 'stroked';
          });
        }
      }
      if (!abort) {
        this.selections.productType = undefined;
        pType.button = 'raised';
      }
    });
  }

  flatten(productType: any): void {
    this.linkSealModel.productTypes.forEach((pType) => {
      if (_.isEqual(pType, productType)) {
        pType.materialTypes.forEach((mType) => {
          if (pType.materialTypes.length === 1) {
            mType.button = 'flat';
            this.selections.materialType = mType.identifier;
          } else {
            mType.button = 'raised';
          }
        });
        pType.screwTypes.forEach((sType) => {
          if (pType.screwTypes.length === 1) {
            sType.button = 'flat';
            this.selections.screwType = sType.identifier;
          } else {
            sType.button = 'stroked';
          }
        });
        pType.button = 'flat';
        this.selections.productType = pType.identifier;
      } else {
        pType.button = 'stroked';
      }
    });
  }

  raiseMaterial(productType: any, materialType: any): void {
    let reverseStrike = false;
    this.selections.materialType = undefined;
    this.linkSealModel.productTypes.forEach((pType) => {
      if (_.isEqual(pType, productType)) {
        pType.materialTypes.forEach((mType) => {
          if (pType.materialTypes.length === 1) {
            mType.button = 'stroked';
            reverseStrike = true;
          } else {
            mType.button = 'raised';
          }
        });
        pType.screwTypes.forEach((sType) => {
          if (reverseStrike) {
            this.selections.screwType = undefined;
          }
          sType.button = 'stroked';
        });
      }
    });
    if (reverseStrike) {
      this.selections.productType = undefined;
      this.linkSealModel.productTypes.forEach((pType) => {
        pType.button = 'raised';
      });
    }
  }

  flattenMaterial(productType: any, materialType: any): void {
    this.linkSealModel.productTypes.forEach((pType) => {
      if (_.isEqual(pType, productType)) {
        pType.materialTypes.forEach((mType) => {
          if (_.isEqual(mType, materialType)) {
            mType.button = 'flat';
            this.selections.materialType = mType.identifier;
            this.selections.screwType = undefined;
          } else {
            mType.button = 'stroked';
          }
        });
        pType.screwTypes.forEach((sType) => {
          sType.button = 'raised';
        });
      }
    });
  }

  raiseScrew(productType: any, screwType: any): void {
    let reverseStrike = false;
    this.selections.screwType = undefined;
    this.linkSealModel.productTypes.forEach((pType) => {
      if (_.isEqual(pType, productType)) {
        if (pType.materialTypes.length === 1) {
          this.selections.materialType = undefined;
          screwType.button = 'stroked';
          pType.materialTypes[0].button = 'stroked';
          reverseStrike = true;
        } else {
          pType.screwTypes.forEach((sType) => {
            sType.button = 'raised';
          });
        }
      }
    });
    if (reverseStrike) {
      this.selections.productType = undefined;
      this.linkSealModel.productTypes.forEach((pType) => {
        pType.button = 'raised';
      });
    }
  }

  flattenScrew(productType: any, screwType: any): void {
    this.linkSealModel.productTypes.forEach((pType) => {
      if (_.isEqual(pType, productType)) {
        pType.screwTypes.forEach((sType) => {
          if (_.isEqual(sType, screwType)) {
            if (sType.button === 'raised') {
              sType.button = 'flat';
              this.selections.screwType = sType.identifier;
            }
          } else {
            sType.button = 'stroked';
          }
        });
      }
    });
  }

}
