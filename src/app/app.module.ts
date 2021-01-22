import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ConfiguratorViewComponent} from './wizard/configurator-view.component';
import {InfoViewComponent} from './wizard/info-view.component';
import {ResultsComponent} from './wizard/results.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    InfoViewComponent,
    ConfiguratorViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
