import { Injectable, Inject } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';

import {
    GET_PATIENT_ACTION, GetPatientAction,
    PatientInfoUpdateAction,
    GET_PRACTITIONER_ACTION, GetPractitionerAction,
    PractitionerInfoUpdateAction,
    GET_PATIENT_LIST_ACTION, GetPatientListAction,
    PatientListUpdatedAction,
    MAKE_APPT_ACTION, MakeApptAction,
    APPT_MADE_ACTION,
    ApptMadeAction,
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

  @Effect()
  public practitionerInfo$ = this.action$.ofType(GET_PRACTITIONER_ACTION)
    .switchMap((a: GetPractitionerAction) => {
        return Observable.fromPromise(this.fhirDataService.getPractitioner(a.payload));
    })
    .map((res) => new PractitionerInfoUpdateAction(res));

  @Effect()
  public patientList$ = this.action$.ofType(GET_PATIENT_LIST_ACTION)
    .switchMap((a: GetPatientListAction) => {
        return Observable.fromPromise(this.fhirDataService.getPatientsOnList(a.payload));
    })
    .map((res) => new PatientListUpdatedAction(res));

  @Effect()
  public appointment$ = this.action$.ofType(MAKE_APPT_ACTION)
    .switchMap((a: MakeApptAction) => {
        return Observable.fromPromise(this.fhirDataService.makeAppointment(a.payload));
    })
    .map((res) => new ApptMadeAction(res));
}