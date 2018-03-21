import { Action } from "@ngrx/store";

export const GET_PATIENT_ACTION: string = '[fhir-data] Get Patient Action';
export const PATIENT_INFO_UPDATE_ACTION: string = '[fhir-data] Patient Info Update Action';
export const GET_PRACTITIONER_ACTION: string = '[fhir-data] Get Practitioner Action';
export const PRACTITIONER_INFO_UPDATE_ACTION: string = '[fhir-data] Practitioner Info Update Action';

export class GetPatientAction implements Action {
    readonly type: string = GET_PATIENT_ACTION;
    constructor(public payload: any){}
}

export class PatientInfoUpdateAction implements Action {
    readonly type: string = PATIENT_INFO_UPDATE_ACTION;
    constructor(public payload: any){}
}

export class GetPractitionerAction implements Action {
    readonly type: string = GET_PRACTITIONER_ACTION;
    constructor(public payload: any){}
}

export class PractitionerInfoUpdateAction implements Action {
    readonly type: string = PRACTITIONER_INFO_UPDATE_ACTION;
    constructor(public payload: any){}
}