import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPatientAction } from '../shared/data-store';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public patient$: Observable<any>;
  public patientQueryInput: string;

  constructor(
    private store: Store<state.AppState>,
  ) { 
    this.patient$ = this.store.select(state.getPatientInfo);
  }

  ngOnInit() {
  }

  public getPatient() {
    this.store.dispatch(new GetPatientAction(this.patientQueryInput));
  }

  updateSearchText(input: any) {
    this.patientQueryInput = input;
  }
}
