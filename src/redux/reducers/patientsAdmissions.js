import * as actionType from "../actionTypes";

const patientAdmissionReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_PATIENTS_ADMISSIONS:
      return action.data;
    case actionType.CREATE_PATIENT_ADMISSION:
      return [...state, action.data];
    case actionType.UPDATE_PATIENT_ADMISSION:
      return state.map((patientAdmission) =>
        patientAdmission.lbp !== action.data.lbp
          ? patientAdmission
          : action.data
      );
    default:
      return state;
  }
};

export default patientAdmissionReducer;
