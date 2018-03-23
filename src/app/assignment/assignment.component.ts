import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPatientListAction, GetPractitionerAction, MakeApptAction } from '../shared/data-store';
import { ActionPayload } from '../shared/data-store/data.state';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})

export class AssignmentComponent implements OnInit {
  public selectedPatient$: Observable<any>;
  public selectedPatientSub: Subscription;
  public selectedProviderSub: Subscription;
  public selectedProvider$: Observable<any>;
  public providerList$: Observable<any>;
  public apptDate: string;
  public apptTime: string;
  public apptComment: string;
  public appointment: ActionPayload;

  constructor(
    private store: Store<state.AppState>,
    private router: Router,
  ) { 
    this.selectedPatient$ = this.store.select(state.getSelectedPatient);
    this.selectedProvider$ = this.store.select(state.getSelectedProvider);
    this.providerList$ = this.store.select(state.getPractitionerInfo);
  }

  ngOnInit() {
    this.store.dispatch(new GetPractitionerAction('?family=family'));
    this.apptComment = "This was created at FHIRWorks!";
    this.apptDate = "03/26/2018";
    this.apptTime = "08:00";
    this.appointment = {
      epiPatientId: 'E2616',
      provId: '1000',
      slotDate: '03/26/2018',
      slotTime: '08:00',
      comment: '',
    }

    this.selectedPatientSub = this.selectedPatient$.subscribe((i) => {
      this.appointment.epiPatientId = i['epiId'];
    });

    this.selectedProviderSub = this.selectedProvider$.subscribe((i) => {
      this.appointment.provId= i['valueId'];
    });

  }

  ngOnDestroy() {

  }

  confirmAppt(p: any) {
    this.store.dispatch(new MakeApptAction(this.appointment));
    this.router.navigateByUrl('/confirmation')
  }

  updateApptTime(input: any) {
    this.appointment.slotTime = input;
  }

  updateApptDate(input: any) {
    let date = new Date(input);
    var day = date.getDate() + 1;
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    this.appointment.slotDate = `${monthIndex}/${day}/${year}`;
  }

  updateApptComment(input: any) {
    this.appointment.comment = input;
  }
}