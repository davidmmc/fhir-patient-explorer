import { Action } from "@ngrx/store";

export const GET_PATIENT_ACTION: string = '[fhir-data] Get Patient Action';
export const PATIENT_INFO_UPDATE_ACTION: string = '[fhir-data] Patient Info Update Action';
export const GET_PRACTITIONER_ACTION: string = '[fhir-data] Get Practitioner Action';
export const PRACTITIONER_INFO_UPDATE_ACTION: string = '[fhir-data] Practitioner Info Update Action';

export const GET_PATIENT_LIST_ACTION: string = '[fhir-data] Get Patient List Action';
export const PATIENT_LIST_UPDATE_ACTION: string = '[fhir-data] Patient List Update Action';
export const SELECT_PATIENT_ACTION: string = '[fhir-data] Select Patient Action';
export const MAKE_APPT_ACTION: string = '[fhir-data] Make Appt Action';
export const APPT_MADE_ACTION: string = '[fhir-data] Appt Made Action';

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

export class GetPatientListAction implements Action {
    readonly type: string = GET_PATIENT_LIST_ACTION;
    constructor(public payload: any){}
}

export class PatientListUpdatedAction implements Action {
    readonly type: string = PATIENT_LIST_UPDATE_ACTION;
    constructor(public payload: any){}
}

export class SelectPatientAction implements Action {
    readonly type: string = SELECT_PATIENT_ACTION;
    constructor(public payload: any){}
}

export class MakeApptAction implements Action {
    readonly type: string = MAKE_APPT_ACTION;
    constructor(public payload: any){}
}

export class ApptMadeAction implements Action {
    readonly type: string = APPT_MADE_ACTION;
    constructor(public payload: any){}
}