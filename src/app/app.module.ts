import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultsComponent } from './wizard/results.component';
import { InfoViewComponent } from './wizard/info-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    InfoViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
