import { Action } from '@ngrx/store';

import { State } from './data.state';
import {
    PATIENT_INFO_UPDATE_ACTION
} from './data.actions';

export function reducer(state: State, action: any): any {
    switch(action.type) {
        case PATIENT_INFO_UPDATE_ACTION: {
            let dataState: State = Object.assign({}, state);
            dataState.patientInfo = action.payload;
            return dataState; 
        }

        default: {
            return state;
        }
    }

}
