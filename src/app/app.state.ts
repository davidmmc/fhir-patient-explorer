import { ActionReducerMap } from '@ngrx/store';

import * as dataState from './shared/data-store/';

export interface AppState {
    dataState: dataState.State;
}

export const initialState: AppState = {
    dataState: dataState.initialState,
}

export const reducers: ActionReducerMap<AppState> = {
    dataState: dataState.reducer,
}

export const effects: Array<any> = [
    dataState.FhirDataEffects
]

export const getPatientInfo = (s: AppState) => s.dataState.patientInfo;
export const getPractitionerInfo = (s: AppState) => s.dataState.practitionerInfo;
export const getPatientList = (s: AppState) => s.dataState.patientList;
export const getSelectedPatient = (s: AppState) => s.dataState.selectedPatient;
export const getSelectedProvider = (s: AppState) => s.dataState.selectedProvider;