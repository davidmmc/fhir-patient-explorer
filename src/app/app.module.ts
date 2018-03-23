import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppState, initialState, reducers, effects } from './app.state';
import { AppComponent } from './app.component';
import { DATA_SERVICE, FhirDataService } from './shared/fhir-data/fhir-data.service';
import { HeaderComponent } from './header/header.component';
import { PractitionerComponent } from './practitioner/practitioner.component';
import { PatientComponent } from './patient/patient.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { PractitionerListComponent } from './practitioner-list/practitioner-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    PractitionerComponent,
    PatientComponent,
    PatientListComponent,
    AssignmentComponent,
    PractitionerListComponent,
    ConfirmationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    StoreModule.forRoot(reducers, {initialState}),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {provide: DATA_SERVICE, useFactory: (http) => new FhirDataService(http), deps: [HttpClient]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
