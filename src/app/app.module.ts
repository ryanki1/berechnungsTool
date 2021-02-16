import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {NgModule} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ButtonConfiguratorComponent} from './common/widget/button-configurator.component';
import {ConfiguratorViewComponent} from './wizard/configurator-view.component';
import {InfoViewComponent} from './wizard/info-view.component';
import {ResultsComponent} from './wizard/results.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    InfoViewComponent,
    ConfiguratorViewComponent,
    ButtonConfiguratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
