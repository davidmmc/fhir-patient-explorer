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
    selectedProvider: any;
    appointment: ActionPayload;
}

export const initialState: State = {
    patientInfo: {},
    practitionerInfo: {},
    patientList: {},
    selectedPatient: {},
    selectedProvider: {},
    appointment: {} as ActionPayload,
}