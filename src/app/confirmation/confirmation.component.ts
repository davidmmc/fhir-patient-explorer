import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPatientAction } from '../shared/data-store';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ConfirmationComponent implements OnInit {
  public apptConfirm$: Observable<any>;

  constructor(
    private store: Store<state.AppState>,
  ) { 
    this.apptConfirm$ = this.store.select(state.getApptConfirm);
  }

  ngOnInit() {
  }
}
