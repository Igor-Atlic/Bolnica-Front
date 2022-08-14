import * as actionType from "../actionTypes";
const patientReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.SEARCH_PATIENTS:
      return action.data;
    case actionType.DELETE_FILTERED_PATIENT:
      return state.filter((patient) =>
        patient.lbp !== action.lbp ? patient : false
      );
    default:
      return state;
  }
};

export default patientReducer;
