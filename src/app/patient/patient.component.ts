import { Component, OnInit, Inject } from '@angular/core';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public patient$: Observable<any>;
  public patientQueryInput: string;

  constructor(
    @Inject(DATA_SERVICE) public dataService: DataService,
  ) { }

  ngOnInit() {
  }

  public getPatient() {
    this.patient$ = Observable.fromPromise(this.dataService.getPatient(this.patientQueryInput));
  }

  updateSearchText(input: any) {
    console.log(input);
    this.patientQueryInput = input;
  }
}
