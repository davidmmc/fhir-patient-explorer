import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPatientListAction, GetPractitionerAction, MakeApptAction } from '../shared/data-store';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})

export class AssignmentComponent implements OnInit {
  public selectedPatient$: Observable<any>;
  public providerList$: Observable<any>;
  public apptDate: string;
  public apptTime: string;
  public apptComment: string;

  constructor(
    private store: Store<state.AppState>,
    private router: Router,
  ) { 
    this.selectedPatient$ = this.store.select(state.getSelectedPatient);
    this.providerList$ = this.store.select(state.getPractitionerInfo);
  }

  ngOnInit() {
    this.store.dispatch(new GetPractitionerAction('?family=family'));
    this.apptComment = "This was created at FHIRWorks!";
    this.apptDate = "03/26/2018";
    this.apptTime = "08:00";
  }

  confirmAppt(p: any) {
    this.store.dispatch(new MakeApptAction(p));
    this.router.navigateByUrl('/confirmation')
  }
}