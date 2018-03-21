import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { environment } from '../../../environments/environment';

export interface DataService {
  getPatient(query: string): Promise<any>;
  getEncounter(query: string): Promise<any>;
  getPractitioner(query: string): Promise<any>;
}

export const DATA_SERVICE = new InjectionToken<DataService>('DataService');

@Injectable()
export class FhirDataService implements DataService {

    constructor(private http: HttpClient) {}

    public getPatient(query: string) { 
        const q = query ? `${query}` : '';
        return this.queryFhirEndpoint(`Patient${q}`);
    }

    public getPractitioner(query: string) { 
        const q = query ? `${query}` : '';
        return this.queryFhirEndpoint(`Practitioner${q}`);
    }

    public getEncounter(query: string) { 
        const q = query ? `?${query}` : '';
        return this.queryFhirEndpoint(`Encounter${q}`);
    }

    private queryFhirEndpoint(url: string) {
        const httpOptions = {
            headers: {
                'Authorization': 'Basic RU1QJG1heW8wMjpub0xpcXVpZDJoZWFyPw=='
            }
        };

        const fhirUrl = `${environment.baseFhir}${url}`;

        return this.http.get(fhirUrl, httpOptions)
          .map((response: any) => {
              return response;
          }).toPromise();
    }
}
