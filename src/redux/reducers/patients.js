import * as actionType from "../actionTypes";
const patientReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_PATIENTS:
      return action.data;
    case actionType.UPDATE_PATIENT:
      return state.map((patient) =>
        patient.lbz !== action.data.lbz ? patient : action.data
      );
    case actionType.DELETE_PATIENT:
      return state.filter((patient) =>
        patient.lbp !== action.lbp ? patient : false
      );
    default:
      return state;
  }
};

export default patientReducer;
