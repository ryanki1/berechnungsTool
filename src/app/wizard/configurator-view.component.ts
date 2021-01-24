import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {AppEnvironment, LinkSealModel} from '../../assets/model';
import {i18n} from '../../assets/translate';
import {LinkSealService} from '../service/linkSeal.service';
import {Base} from '../common/base';

@Component({
  selector: 'app-configurator-view',
  templateUrl: './configurator-view.component.html'
})
export class ConfiguratorViewComponent extends Base implements OnInit {

  @Input() resultForConfiguration: any;
  @Output() resultForConfigurationChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() displayInfo: EventEmitter<void> = new EventEmitter<void>();
  @Output() displayResult: EventEmitter<void> = new EventEmitter<void>();

  /**
   * ----------------------------------------------
   * CONFIGURATOR LOGIC MODEL
   * ----------------------------------------------
   */


  /**
   * the visibility flag for the configurator view
   * @type {boolean}
   */
  configuratorViewVisible = true;

  /**
   * the visibility flag for the result view
   * @type {boolean}
   */
  resultViewVisible = false;

  /**
   * the visibility flag for the info view
   * @type {boolean}
   */
  infoViewVisible = false;

  /**
   * ----------------------------------------------
   * WALL SLEEVE TYPE SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the wall sleeve types
   * @type {Array}
   */
  wallSleeveTypes = [];

  /**
   * the wall sleeve type selected by the user
   * @type {Object}
   */
  selectedWallSleeveTypeIdentifier = null;

  /**
   * ----------------------------------------------
   * WALL SLEEVE SIZES SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the wall sleeve sizes.
   * @type {Array}
   */
  wallSleeveSizes = [];

  /**
   * the wall sleeve size selected by the user
   * @type {Object}
   */
  selectedWallSleeveSize = null;

  /**
   * the wall sleeve size given by the user
   * @type {Object}
   */
  inputWallSleeveSize = '';

  /**
   * ----------------------------------------------
   * CARRIER PIPE TYPE SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the carrier pipe types
   * @type {Array}
   */
  carrierPipeTypes = [];

  /**
   * the carrier pipe type selected by the user
   * @type {Object}
   */
  selectedCarrierPipeTypeIdentifier = null;

  /**
   * ----------------------------------------------
   * CARRIER PIPE SIZES SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the carrier pipe sizes - to be provided by the carrier pipe types model after selection.
   * @type {Array}
   */
  carrierPipeSizes = [];

  /**
   * the carrier pipe size selected by the user
   * @type {Object}
   */
  selectedCarrierPipeSize = null;

  /**
   * the carrier pipe size given by the user
   * @type {Object}
   */
  inputCarrierPipeSize = '';

  /**
   * ----------------------------------------------
   * PRODUCT TYPE SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the product types - to be provided by the LinkSealService.
   * @type {Array}
   */
  productTypes = [];

  /**
   * the product type selected by the user
   * @type {Object}
   */
  selectedProductTypeIdentifier = null;

  /**
   * ----------------------------------------------
   * MATERIAL TYPE SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the material types - to be provided by the LinkSealService.
   * @type {Array}
   */
  materialTypes = [];

  /**
   * the material type selected by the user
   * @type {Object}
   */
  selectedMaterialTypeIdentifier = null;

  /**
   * ----------------------------------------------
   * SCREW TYPE SELECTION MODEL
   * ----------------------------------------------
   */

  /**
   * the screw type - to be provided by the LinkSealService.
   * @type {Array}
   */
  screwTypes = [];

  /**
   * the screw type selected by the user
   * @type {Object}
   */
  selectedScrewTypeIdentifier = null;

  constructor(private linkSealService: LinkSealService,
              protected cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.initLinkSealApp();
    if (!!this.linkSealService.configuratorInputs) {
      this.applyAllSelections();
    }
  }

  /**
   * resets the wall sleeve size selection
   */
  resetWallSleeveSizeSelection(): void {
    this.wallSleeveSizes = [];
    this.selectedWallSleeveSize = null;
    this.inputWallSleeveSize = '';
  }
  applyWallSleeveSizeSelection(): void {
    if (this.linkSealService.configuratorInputs &&
      this.linkSealService
        .configuratorInputs
        .wallSleeveSizeSelection) {
      this.wallSleeveSizes = this.linkSealService
        .configuratorInputs
        .wallSleeveSizeSelection
        .wallSleeveSizes;
      this.selectedWallSleeveSize = this.linkSealService
        .configuratorInputs
        .wallSleeveSizeSelection
        .selectedWallSleeveSize;
      this.inputWallSleeveSize = this.linkSealService
        .configuratorInputs
        .wallSleeveSizeSelection
        .inputWallSleeveSize;
    }
  }

  /**
   * resets the wall sleeve type selection
   */
  resetWallSleeveTypeSelection(): void {
    this.selectedWallSleeveTypeIdentifier = 'WALL_SLEEVE_TYPE_OTHER';
  }
  applyWallSleeveTypeSelection(): void {
    if (this.linkSealService.configuratorInputs.wallSleeveTypeSelection) {
      this.selectedWallSleeveTypeIdentifier = this.linkSealService
        .configuratorInputs
        .wallSleeveTypeSelection
        .selectedWallSleeveTypeIdentifier;
    }
  }

  /**
   * resets the carrier pipe type selection
   */
  resetCarrierPipeTypeSelection(): void {
    this.selectedCarrierPipeTypeIdentifier = 'CARRIER_PIPE_TYPE_OTHER';
  }
  applyCarrierPipeTypeSelection(): void {
    if (this.linkSealService
        .configuratorInputs
        .carrierPipeTypeSelection
    ) {
      this.selectedCarrierPipeTypeIdentifier = this.linkSealService
        .configuratorInputs
        .carrierPipeTypeSelection
        .selectedCarrierPipeTypeIdentifier;
    }
  }

  /**
   * resets the carrier pipe sizes selection
   */
  resetCarrierPipeSizeSelection(): void {
    this.carrierPipeSizes = [];
    this.selectedCarrierPipeSize = null;
    this.inputCarrierPipeSize = '';
  }
  applyCarrierPipeSizeSelection(): void {
    if (this.linkSealService
        .configuratorInputs
        .carrierPipeSizeSelection) {
      this.carrierPipeSizes = this.linkSealService
        .configuratorInputs
        .carrierPipeSizeSelection
        .carrierPipeSizes;
      this.selectedCarrierPipeSize = this.linkSealService
        .configuratorInputs
        .carrierPipeSizeSelection
        .selectedCarrierPipeSize;
      this.inputCarrierPipeSize = this.linkSealService
        .configuratorInputs
        .carrierPipeSizeSelection
        .inputCarrierPipeSize;
    }
  }

  /**
   * resets the material type selection
   */
  resetMaterialTypeSelection(): void {
    this.materialTypes = [];
    this.selectedMaterialTypeIdentifier = null;
  }
  applyMaterialTypeSelection(): void {
    if (this.linkSealService
        .configuratorInputs
        .materialTypeSelection) {
      this.materialTypes = this.linkSealService
        .configuratorInputs
        .materialTypeSelection
        .materialTypes;
      this.selectedMaterialTypeIdentifier = this.linkSealService
        .configuratorInputs
        .materialTypeSelection
        .selectedMaterialTypeIdentifier;
    }
  }

  /**
   * resets the product type selection
   */
  resetProductTypeSelection(): void {
    this.selectedProductTypeIdentifier = null;
  }
  applyProductTypeSelection(): void {
    if (this.linkSealService
        .configuratorInputs
        .productTypeSelection) {
      this.selectedProductTypeIdentifier = this.linkSealService
        .configuratorInputs
        .productTypeSelection
        .selectedProductTypeIdentifier;
    }
  }

  /**
   * resets the screw type selection
   */
  resetScrewTypeSelection(): void {
    this.screwTypes = [];
    this.selectedScrewTypeIdentifier = null;
  }
  applyScrewTypeSelection(): void {
    if (this.linkSealService
        .configuratorInputs
        .screwTypeSelection) {
      this.screwTypes = this.linkSealService
        .configuratorInputs
        .screwTypeSelection
        .screwTypes;
      this.selectedScrewTypeIdentifier = this.linkSealService
        .configuratorInputs
        .screwTypeSelection
        .selectedScrewTypeIdentifier;
    }
  }

  /**
   * ----------------------------------------------
   * INFO PROVIDERS
   * ----------------------------------------------
   */

  /**
   * Tells whether the angular app is running inside an app (container) on a mobile device.
   * @returns {boolean}
   */
  isRunningInApp(): boolean {
    return AppEnvironment.environment === 'app';
  }

  /**
   * Tells whether the calculated configuration has solutions.
   * @returns {boolean}
   */
  hasResultSolutions(): boolean {
    if (this.resultForConfiguration
      && !this.resultForConfiguration.solutions
      && (this.resultForConfiguration.solutions.length > 0)) {
      return true;
    }
    return false;
  }

  /**
   * Tells whether the calculated configuration has errors.
   * @returns {boolean}
   */
  hasResultErrors(): boolean {
    if (this.resultForConfiguration &&
      (this.resultForConfiguration.error !== '')
    ) {
      return true;
    }
    return false;
  }

  /**
   * Returns the current language.
   * @type {*}
   */
  getCurrentLanguage(): string {
    return i18n.preferredLanguage;
  }

  /**
   * Tells whether "other" is selected as the wall sleeve type.
   * @returns {boolean}
   */
  isSelectedWallSleeveTypeOther(): boolean {
    return (this.selectedWallSleeveTypeIdentifier === 'WALL_SLEEVE_TYPE_OTHER');
  }

  /**
   * Tells whether "other" is selected as the carrier pipe type.
   * @returns {boolean}
   */
  isSelectedCarrierPipeTypeOther(): boolean {
    return (this.selectedCarrierPipeTypeIdentifier === 'CARRIER_PIPE_TYPE_OTHER');
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
   * Checks whether the inner diameter of a given solution is deviating from the inner diameter chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isInnerDiameterDeviating(solution) {
    return (solution.adls > this.resultForConfiguration.inner_diameter);
  }

  /**
   * Checks whether the outer diameter of a given solution is deviating from the outer diameter chosen by the user.
   * @param solution
   * @returns {boolean}
   */
  isOuterDiameterDeviating(solution): boolean {
    return (solution.idls < this.resultForConfiguration.outer_diameter);
  }

  /**
   * Checks whether the app context is PSI
   * @returns {boolean}
   */
  isContextPSI(): boolean {
    return AppEnvironment.context === 'PSI';
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
   * Checks whether the app context is neutral
   * @returns {boolean}
   */
  isContextNeutral(): boolean {
    return AppEnvironment.context === 'neutral';
  }

  /**
   * -----------------------------------------------------------
   * HANDLER FOR SELECTION CHANGES
   * -----------------------------------------------------------
   */


  /**
   * Handler for wall sleeve type change.
   */
  onWallSleeveTypeChange(): void {
    if (this.selectedWallSleeveTypeIdentifier === 'WALL_SLEEVE_TYPE_OTHER') {
      this.inputWallSleeveSize = '';
    } else {
      this.wallSleeveTypes.forEach((type) => {
        if (type.identifier === this.selectedWallSleeveTypeIdentifier) {
          this.wallSleeveSizes = type.sizes;
        }
      });

      // uncomment the following line for preselection
      this.selectedWallSleeveSize = this.wallSleeveSizes[0];
    }
  }

  /**
   * Handler for wall sleeve size change.
   */
  onWallSleeveSizeChange(): void {
  }

  /**
   * Handler for carrier pipe type change.
   */
  onCarrierPipeTypeChange(): void {
    if (this.selectedCarrierPipeTypeIdentifier === 'CARRIER_PIPE_TYPE_OTHER') {
      this.inputCarrierPipeSize = '';
    } else {
      this.carrierPipeTypes.forEach((type) => {
        if (type.identifier === this.selectedCarrierPipeTypeIdentifier) {
          this.carrierPipeSizes = type.sizes;
        }
      });

      // uncomment the following line for preselection
      this.selectedCarrierPipeSize = this.carrierPipeSizes[0];
    }
  }

  /**
   * Handler for carrier pipe size change.
   */
  onCarrierPipeSizeChange(): void {
  }

  /**
   *  Handler for product type change.
   */
  onProductTypeChange(): void {
    this.productTypes.forEach((product) => {
      if (product.identifier === this.selectedProductTypeIdentifier) {
        this.materialTypes = [];
        product.materialTypes.forEach((materialType) => {
          this.materialTypes.push(materialType);
        });
        this.screwTypes = [];
        product.screwTypes.forEach((screwType) => {
          this.screwTypes.push(screwType);
        });
      }
    });
    if (this.isContextRf() || this.isContextTVG()) {
      // remove green material completely
      this.materialTypes = this.materialTypes.splice(0, 2);
      this.selectedMaterialTypeIdentifier = this.materialTypes[0].identifier;
      // remove zinc plated screws from selection for R+F material type EPDM black and regular LINK-SEAL
      // (not drinking water)
      if ((this.selectedProductTypeIdentifier !== 'PRODUCT_LINK_SEAL_DRINKING_WATER')
        && (this.selectedMaterialTypeIdentifier === 'MATERIAL_EPDM_BLACK')) {
        this.screwTypes = this.screwTypes.splice(1, 1);
      }
    }
    // uncomment the following line for preselection
    this.selectedScrewTypeIdentifier = this.screwTypes[0].identifier;
  }

  /**
   *  Handler for material type change.
   */
  onMaterialTypeChange(): void {
    if (this.isContextRf() || this.isContextTVG()) {
      this.productTypes.forEach((product) => {
        if (product.identifier === this.selectedProductTypeIdentifier) {
          this.screwTypes = [];
          product.screwTypes.forEach((screwType) => {
            this.screwTypes.push(screwType);
          });
        }
      });
      // remove zinc plated screws from selection for R+F material type EPDM black
      if (this.selectedMaterialTypeIdentifier === 'MATERIAL_EPDM_BLACK') {
        this.screwTypes = this.screwTypes.splice(1, 1);
      }
    }
    // uncomment the following line for preselection
    this.selectedScrewTypeIdentifier = this.screwTypes[0].identifier;
  }


  /**
   * On screw type change enable the "calculate" button.
   */
  onScrewTypeChange(): void {

  }

  /**
   * -----------------------------------------------------------
   * VIEW TOGGLES AND HELPERS
   * -----------------------------------------------------------
   */

  resetAllSelections(): void {
    this.resetWallSleeveTypeSelection();
    this.resetWallSleeveSizeSelection();
    this.resetCarrierPipeTypeSelection();
    this.resetCarrierPipeSizeSelection();
    this.resetProductTypeSelection();
    this.resetMaterialTypeSelection();
    this.resetScrewTypeSelection();
  }
  applyAllSelections(): void {
    this.applyWallSleeveTypeSelection();
    this.applyWallSleeveSizeSelection();
    this.applyCarrierPipeTypeSelection();
    this.applyCarrierPipeSizeSelection();
    this.applyProductTypeSelection();
    this.applyMaterialTypeSelection();
    this.applyScrewTypeSelection();
  }

  saveInputs(): void {
    this.linkSealService.configuratorInputs = {
      wallSleeveSizeSelection: {
        wallSleeveSizes: this.wallSleeveSizes,
        selectedWallSleeveSize: this.selectedWallSleeveSize,
        inputWallSleeveSize: this.inputWallSleeveSize
      },
      wallSleeveTypeSelection: {
        selectedWallSleeveTypeIdentifier: this.selectedWallSleeveTypeIdentifier
      },
      carrierPipeTypeSelection: {
        selectedCarrierPipeTypeIdentifier: this.selectedCarrierPipeTypeIdentifier
      },
      carrierPipeSizeSelection: {
        carrierPipeSizes: this.carrierPipeSizes,
        selectedCarrierPipeSize: this.selectedCarrierPipeSize,
        inputCarrierPipeSize: this.inputCarrierPipeSize
      },
      materialTypeSelection: {
        materialTypes: this.materialTypes,
        selectedMaterialTypeIdentifier: this.selectedMaterialTypeIdentifier
      },
      productTypeSelection: {
        selectedProductTypeIdentifier: this.selectedProductTypeIdentifier
      },
      screwTypeSelection: {
        screwTypes: this.screwTypes,
        selectedScrewTypeIdentifier: this.selectedScrewTypeIdentifier
      }
    };
  }

  /**
   * ----------------------------------------------
   * INIT FUNCTIONS
   * ----------------------------------------------
   */

  /**
   * Initializes the LINK-SEAL&reg; App inside an app.
   */
  initInApp(): void {

  }

  /**
   * Initializes the LINK-SEAL&reg; App on a website.
   */
  initOnWebsite(): void {
    // uncomment the following line for preselection of wall sleeve type
    // $scope.selectedWallSleeveTypeIdentifier = $scope.wallSleeveTypes[0].identifier;
  }

  /**
   * Initializes the LINK-SEAL&reg; App for special R+F configurations.
   */
  initForRfAndTVG(): void {

    // remove green material completely
    this.productTypes = this.productTypes.splice(0, 1);

    // remove green material completely
    this.materialTypes = this.materialTypes.splice(0, 2);

    // remove zink plated screws for preselected black material
    this.screwTypes = this.screwTypes.splice(1, 1);
    this.selectedScrewTypeIdentifier = this.screwTypes[0].identifier;
  }

  /**
   * Initializes the LINK-SEAL&reg; App with default states and overrides these corresponding to the environment.
   */
  initLinkSealApp(): void {
    this.resetAllSelections();

    this.wallSleeveTypes = LinkSealModel.wallSleeveTypes;
    this.carrierPipeTypes = LinkSealModel.carrierPipeTypes;
    this.productTypes = LinkSealModel.productTypes;

    // set defaults for all types

    this.selectedProductTypeIdentifier = this.productTypes[0].identifier;
    this.productTypes.forEach(product => {
      if (product.identifier === this.selectedProductTypeIdentifier) {
        this.materialTypes = [];
        product.materialTypes.forEach((materialType) => {
          this.materialTypes.push(materialType);
        });
        this.screwTypes = [];
        product.screwTypes.forEach((screwType) => {
          this.screwTypes.push(screwType);
        });
      }
    });

    // uncomment the following line for preselection
    this.selectedMaterialTypeIdentifier = this.materialTypes[0].identifier;
    this.selectedScrewTypeIdentifier = this.screwTypes[0].identifier;

    // init for environment configuration - can override the default states
    if (this.isRunningInApp()) {
      this.initInApp();
    } else if (this.isRunningOnWebsite()) {
      this.initOnWebsite();
    }

    // init for context configuration - can override the default states
    if (this.isContextRf() || this.isContextTVG()) {
      this.initForRfAndTVG();
    }
  }

  /**
   * Tells whether it is allowed to trigger a calculation.
   * @returns {boolean}
   */
  isCalculateButtonDisabled(): boolean {
    if (
      (this.selectedWallSleeveTypeIdentifier === 'WALL_SLEEVE_TYPE_OTHER') &&
      (this.inputWallSleeveSize === '')
    ) {
      // wall sleeve type other and size empty
      return true;
    } else if (
      (this.selectedCarrierPipeTypeIdentifier === 'CARRIER_PIPE_TYPE_OTHER') &&
      (this.inputCarrierPipeSize === '')
    ) {
      // carrier pipe type other and size empty
      return true;
    } else if (
      (this.selectedWallSleeveTypeIdentifier === '') ||
      (this.selectedCarrierPipeTypeIdentifier === '') ||
      (this.selectedProductTypeIdentifier === '') ||
      (this.selectedMaterialTypeIdentifier === '') ||
      (this.selectedScrewTypeIdentifier === '')
    ) {
      // mandatory fields not filled out
      return true;
    }

    // default: enabled
    return false;
  }


  /**
   * ----------------------------------------------
   * Page click actions e.g. button, link
   * ----------------------------------------------
   */

  showInfo(): void {
    this.displayInfo.emit();
  }

  /**
   * Calculates the solutions for a given configuration by asking the corresponding service.
   * Therefore differentiates between website and app context
   */
  calculate(): void {
    if (!this.isCalculateButtonDisabled()) {

      this.saveInputs();

      let wallSleeveSize = this.inputWallSleeveSize;
      let carrierPipeSize = this.inputCarrierPipeSize;

      if (this.isRunningOnWebsite()) {
        if (!this.isSelectedWallSleeveTypeOther()) {
          wallSleeveSize = this.selectedWallSleeveSize;
        }
        if (!this.isSelectedCarrierPipeTypeOther()) {
          carrierPipeSize = this.selectedCarrierPipeSize;
        }
      }

      let context = AppEnvironment.context;
      // override TVG context with R+F context - results are the same, they only differ in language constants
      if (context === 'TVG') {
        context = 'Rf';
      }

      this.linkSealService.getResults(context,
        this.selectedWallSleeveTypeIdentifier,
        wallSleeveSize,
        this.selectedCarrierPipeTypeIdentifier,
        carrierPipeSize,
        this.selectedProductTypeIdentifier,
        this.selectedMaterialTypeIdentifier,
        this.selectedScrewTypeIdentifier)
        .subscribe((data) => {
          console.log(data);
          if (data === 'exceptionError') {
            this.resultForConfiguration = {};
            this.resultForConfiguration.error = 'ERROR_EXCEPTION';
          } else if (data === 'suitabilityError') {
            this.resultForConfiguration = {};
            this.resultForConfiguration.error = 'ERROR_SUITABILITY';
          } else if ((data.solutions.length === 0)
            && (data.sets.length === 0)) {
            this.resultForConfiguration = {};
            this.resultForConfiguration.error = 'ERROR_DEFAULT';
          } else {
            this.resultForConfiguration = {...data};
            this.resultForConfigurationChange.emit(this.resultForConfiguration);
            this.addFootnotesToResult();
          }
          this.displayResult.emit();
        }, (error) => {
          console.log('failed loading result for configuration');
          this.displayResult.emit();
        });
    }
  }

  /**
   * Adds footnotes if specific conditions apply.
   */
  addFootnotesToResult(): void {
    this.resultForConfiguration.notices = [];
    this.resultForConfiguration.solutions.forEach(solution => {
      if (((solution.type === 200) || (solution.type === 265)) && (solution.idls > 150)) {
        this.resultForConfiguration.notices.push('LS200LS265');
      } else if ((solution.type === 300) && (solution.inner_diameter > 300)) {
        this.resultForConfiguration.notices.push('LS300');
      }
      if ((this.isDiameterDeviating(solution)) && !(this.resultForConfiguration.notices.indexOf('DEVIATIONS') >= 0)) {
        // checks for deviations and if present, only adds the notice, if it is not already present -> indexOf
        this.resultForConfiguration.notices.push('DEVIATIONS');
      }
    });
  }

}
