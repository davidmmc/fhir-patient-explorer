import { Action } from '@ngrx/store';
import { pathOr } from 'ramda';

import { State } from './data.state';
import {
    PATIENT_INFO_UPDATE_ACTION,
    PRACTITIONER_INFO_UPDATE_ACTION,
    PATIENT_LIST_UPDATE_ACTION,
    SELECT_PATIENT_ACTION,
    SELECT_PROVIDER_ACTION,
    APPT_MADE_ACTION,
} from './data.actions';

export function reducer(state: State, action: any): any {
    switch(action.type) {
        case PATIENT_INFO_UPDATE_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.patientInfo = action.payload;
            return dataState; 
        }

        case PRACTITIONER_INFO_UPDATE_ACTION: {
            let dataState: State = Object.assign({}, state);
            //dataState.practitionerInfo = action.payload;
            dataState.practitionerInfo = action.payload.entry.map((p) => {
                return {
                    name: p.resource.name.text,
                    valueId: pathOr("", ['resource', 'identifier', [0], 'value'], p),
                    specialty: pathOr("", ['resource', 'practitionerRole', [0], 'specialty', [0], 'text'], p),
                }
            })
            return dataState; 
        }

        case PATIENT_LIST_UPDATE_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.patientList = action.payload;
            return dataState; 
        }

        case SELECT_PATIENT_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.selectedPatient = action.payload.entry.map((p) => {
                let idArr = pathOr([], ['PatientID'], p);
                let epiId = idArr.filter((i) => {
                    return (pathOr('', ['PatientIDType'], i) == 'EPI') ? (pathOr('', ['PatientID'], i)) : '';
                });
                /*
                let fhirId = pathOr([], ['PatientID'], p).filter((i) => {
                    return (pathOr('', ['PatientIDType'], i) == 'FHIR') ? (pathOr('', ['PatientID'], i)) : '';
                });
                */
                return {
                    name: p.Name,
                    age: p.Age,
                    sex: p.Sex,
                    epiId: epiId,
                    fhirId: '',
                }
            })

            dataState.selectedPatient = action.payload;
            return dataState; 
        }

        case APPT_MADE_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.appointment = action.payload;
            return dataState; 
        }

        case SELECT_PROVIDER_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.selectedProvider = action.payload;
            return dataState; 
        }

        default: {
            return state;
        }
    }
}
