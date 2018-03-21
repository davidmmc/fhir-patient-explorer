import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as state from '../app.state';
import { Router } from '@angular/router';
import { GetPractitionerAction } from '../shared/data-store';

@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  styleUrls: ['./practitioner.component.css']
})
export class PractitionerComponent implements OnInit {
  public practitioner$: Observable<any>;
  public practitionerQueryInput: string;

  constructor(
    private store: Store<state.AppState>,
  ) {
    this.practitioner$ = this.store.select(state.getPractitionerInfo);
  }

  ngOnInit() {
  }

  public getPracitioner() {
    this.store.dispatch(new GetPractitionerAction(this.practitionerQueryInput));
  }

  updateSearchText(input: any) {
    this.practitionerQueryInput = input;
  }
}
