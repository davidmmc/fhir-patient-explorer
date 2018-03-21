import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  styleUrls: ['./practitioner.component.css']
})
export class PractitionerComponent implements OnInit {
  public searchText$: Observable<any>;
  public practitioner$: Observable<any>;
  public practitionerQueryInput: string;

  constructor(
    @Inject(DATA_SERVICE) public dataService: DataService,
  ) { }

  ngOnInit() {
  }

  public getPracitioner() {
    this.practitioner$ = Observable.fromPromise(this.dataService.getPractitioner(this.practitionerQueryInput));
  }

  updateSearchText(input: any) {
    console.log(input);
    this.practitionerQueryInput = input;
  }
}
