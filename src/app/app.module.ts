import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AUTH_SERVICE, FhirAuthService } from './shared/auth/auth.service';
import { DATA_SERVICE, FhirDataService } from './shared/fhir-data/fhir-data.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {provide: AUTH_SERVICE, useClass: FhirAuthService },
    {provide: DATA_SERVICE, useFactory: (http) => new FhirDataService(http), deps: [HttpClient]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
