import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPatientListAction, GetPractitionerAction, MakeApptAction, SelectProviderAction } from '../shared/data-store';

@Component({
  selector: 'app-practitioner-list',
  templateUrl: './practitioner-list.component.html',
  styleUrls: ['./practitioner-list.component.css']
})

export class PractitionerListComponent implements OnInit {
  public selectedPatient$: Observable<any>;
  public providerList$: Observable<any>;

  constructor(
    private store: Store<state.AppState>,
    private router: Router,
  ) { 
    this.selectedPatient$ = this.store.select(state.getSelectedPatient);
    this.providerList$ = this.store.select(state.getPractitionerInfo);
  }

  ngOnInit() {
    this.store.dispatch(new GetPractitionerAction('?family=family'));
  }

  selectP(p: any) {
    this.store.dispatch(new SelectProviderAction(p));
    this.router.navigateByUrl('/assignment')
  }
}