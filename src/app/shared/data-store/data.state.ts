export interface State {
    patientInfo: any;
    practitionerInfo: any;
    patientList: any;
    selectedPatient: any;
    appointment: any;
}

export const initialState: State = {
    patientInfo: {},
    practitionerInfo: {},
    patientList: {},
    selectedPatient: {},
    appointment: {},
}