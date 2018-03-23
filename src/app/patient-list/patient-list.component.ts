import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPatientListAction, SelectPatientAction } from '../shared/data-store';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  public patientList$: Observable<any>;
  public patientListId: string = '10101116';

  constructor(
    private store: Store<state.AppState>,
    private router: Router,
  ) { 
    this.patientList$ = this.store.select(state.getPatientList);
  }

  ngOnInit() {
    this.store.dispatch(new GetPatientListAction(this.patientListId));
  }

  selectPatient(patient: any) {
    this.store.dispatch(new SelectPatientAction(patient));
    this.router.navigateByUrl('/practitioner-list')
  }
}