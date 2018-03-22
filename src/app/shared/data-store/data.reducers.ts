import { Action } from '@ngrx/store';

import { State } from './data.state';
import {
    PATIENT_INFO_UPDATE_ACTION,
    PRACTITIONER_INFO_UPDATE_ACTION,
    PATIENT_LIST_UPDATE_ACTION,
    SELECT_PATIENT_ACTION,
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
            dataState.practitionerInfo = action.payload;
            return dataState; 
        }

        case PATIENT_LIST_UPDATE_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.patientList = action.payload;
            return dataState; 
        }

        case SELECT_PATIENT_ACTION: {
            console.log("Selected a patient")
            let dataState: State = Object.assign({}, state);
            dataState.selectedPatient = action.payload;
            return dataState; 
        }

        default: {
            return state;
        }
    }
}
