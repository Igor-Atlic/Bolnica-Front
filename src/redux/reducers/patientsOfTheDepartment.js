import * as actionType from "../actionTypes";

const patientHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_PATIENTS_HISTORY:
      return action.data;
    case actionType.CREATE_PATIENT_HISTORY:
    case actionType.GET_PATIENTS_VISITS:
      return action.data;
    case actionType.CREATE_PATIENT_VISITS:
    default:
      return state;
  }
};

export default patientHistoryReducer;
