export interface ActionPayload {
    epiPatientId: string;
    provId: string;
    slotDate: string;
    slotTime: string;
    comment: string;
}
export interface State {
    patientInfo: any;
    practitionerInfo: any;
    patientList: any;
    selectedPatient: any;
    appointment: ActionPayload;
}

export const initialState: State = {
    patientInfo: {},
    practitionerInfo: {},
    patientList: {},
    selectedPatient: {},
    appointment: {} as ActionPayload,
}