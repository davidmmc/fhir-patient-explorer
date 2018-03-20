import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AUTH_SERVICE, FhirAuthService } from './shared/auth/auth.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: AUTH_SERVICE, useClass: FhirAuthService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
