export interface State {
    patientInfo: any;
    practitionerInfo: any;
    patientList: any;
    selectedPatient: any;
}

export const initialState: State = {
    patientInfo: {},
    practitionerInfo: {},
    patientList: {},
    selectedPatient: {},
}