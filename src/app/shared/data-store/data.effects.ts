import { Injectable, Inject } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';

import {
    GET_PATIENT_ACTION, GetPatientAction,
    PatientInfoUpdateAction,
} from './data.actions';
import { DATA_SERVICE, FhirDataService } from '../fhir-data/fhir-data.service';

@Injectable()
export class FhirDataEffects {
  constructor (
      private action$: Actions,
      @Inject(DATA_SERVICE) private fhirDataService: FhirDataService,
  ){}

  @Effect()
  public patientInfo$ = this.action$.ofType(GET_PATIENT_ACTION)
    .switchMap((a: GetPatientAction) => {
        return Observable.fromPromise(this.fhirDataService.getPatient(a.payload));
    })
    .map((res) => new PatientInfoUpdateAction(res));
}