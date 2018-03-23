import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { environment } from '../../../environments/environment';
import { LS_ACCESS_TOKEN } from '../../../auth/auth.service';

export interface DataService {
  getPatient(query: string): Promise<any>;
  getPatientsOnList(query: string): Promise<any>;
  getCondition(query: string): Promise<any>;
  getEncounter(query: string): Promise<any>;
  getPractitioner(query: string): Promise<any>;
}

export const DATA_SERVICE = new InjectionToken<DataService>('DataService');

@Injectable()
export class FhirDataService implements DataService {
    accessToken: string = '';

    constructor(private http: HttpClient) {
        this.accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN));
    }

    public getPatient(query: string) { 
        const q = query ? `${query}` : '';
        return this.queryOAuthFhir(`Patient${q}`);
    }

    public getPatientsOnList(listId: string) { 
        const q = listId ? `${listId}` : '';
        return this.queryRestEndpoint(`2015/Clinical/Utility/GetPatientsOnSystemList/SystemList?SystemListID=${q}&SystemListIDType=INTERNAL&UserID=1&UserIDType=EXTERNAL`);
    }

    public getPractitioner(query: string) { 
        const q = query ? `${query}` : '';
        return this.queryOAuthFhir(`Practitioner${q}`);
    }

    public getCondition(query: string) { 
        const q = query ? `?${query}` : '';
        return this.queryFhirEndpoint(`Condition${q}`);
    }

    public getEncounter(query: string) { 
        const q = query ? `?${query}` : '';
        return this.queryFhirEndpoint(`Encounter${q}`);
    }

    private queryFhirEndpoint(url: string) {
        const fhirUrl = `${environment.baseFhir}${url}`;
        return this.queryEndpoint(fhirUrl);
    }

    private queryOAuthFhir(url: string) {
        const oAuthFhirUrl = `${environment.baseOAuthFhir}${url}`;
        return this.queryOAuthEndpoint(oAuthFhirUrl);
    }

    private queryRestEndpoint(url: string) {
        const restUrl = `${environment.baseRest}${url}`;
        return this.queryEndpoint(restUrl);
    }

    private queryEndpoint(url: string) {
        const httpOptions = {
            headers: {
                'Authorization': 'Basic RU1QJG1heW8wMjpub0xpcXVpZDJoZWFyPw=='
            }
        };

        return this.http.get(url, httpOptions)
          .map((response: any) => {
              return response;
          }).toPromise();
    }

    private queryOAuthEndpoint(url: string) {
        const httpOptions = {
            headers: {
                'Authorization': `bearer ${this.accessToken['access_token']}`
            }
        };
        console.log("access token", this.accessToken['access_token'])

        return this.http.get(url, httpOptions)
          .map((response: any) => {
              return response;
          }).toPromise();
    }

    public makeAppointment(epiPatientId: string, provId: string, slotDate: string, slotTime: string, comment: string) { 
        const epi = epiPatientId ? `${epiPatientId}` : '';
        const prov = provId ? `${provId}` : '';
        const date = slotDate ? `${slotDate}` : '03/26/2018';
        const time = slotTime ? `${slotTime}` : '12:00';
        const comm = comment ? `${comment}` : '';
        const restUrl = `${environment.baseRest}2012/Scheduling/Patient/ScheduleAppointment/Appointment`;

        const httpOptions = {
            headers: {
                'Authorization': 'Basic RU1QJG1heW8wMjpub0xpcXVpZDJoZWFyPw==',
                'Content-Type' : 'application/json'
            }
        };

        const body = `{  
            "PatientID":"${epi}",
            "PatientIDType":"EPI",
            "VisitTypeID":"1004",
            "VisitTypeIDType":"External",
            "UserID":"ESMGR",
            "UserIDType":"External",
            "ReferralID":"",
            "ReferralIDType":"",
            "AppointmentNotes":[  
               "${comm}"
            ],
            "WaitListContactID":"",
            "WaitListContactIDType":"",
            "Blocks":[  
         
            ],
            "BlockOverrule":"",
            "BookAppointment":"true",
            "ExternalVisitIdentifier":"",
            "CancelLinkedAppointment":"0",
            "Orders":[  
               {  
                  "ID":"",
                  "Type":""
               }
            ],
            "Slot":{  
               "Date":"${date}",
               "Providers":[  
                  {  
                     "Id":"${prov}",
                     "IdType":"PROVID",
                     "Name":"",
                     "Time":"${time}",
                     "Duration":"30",
                     "Department":{  
                        "Id":"950135",
                        "IdType":"CID",
                        "Name":""
                     }
                  }
               ],
               "Warnings":[  
                  {  
                     "WarningCode":"",
                     "WarningText":[  
                        "",
                        ""
                     ]
                  }
               ]
            }
         }`;

        return this.http.put(restUrl, body, httpOptions)
          .map((response: any) => {
              return response;
          }).toPromise();
        
        //return this.queryRestEndpoint(`2012/Scheduling/Patient/ScheduleAppointment/Appointment`);
        //return Promise.resolve("Appointment")
    }
}
