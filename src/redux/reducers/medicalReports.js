import * as actionType from "../actionTypes";
const medicalReportReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_MEDICAL_REPORTS:
      return action.data;
    case actionType.GET_MEDICAL_REPORT:
      return [action.data];
    case actionType.CREATE_MEDICAL_REPORT:
      return [...state, action.data];
    case actionType.UPDATE_MEDICAL_REPORT:
      return state.map((medicalReport) =>
        medicalReport.lbz !== action.data.lbz ? medicalReport : action.data
      );
    case actionType.DELETE_MEDICAL_REPORT:
      return state.filter((medicalReport) =>
        medicalReport.lbz !== action.lbz ? medicalReport : false
      );

    default:
      return state;
  }
};

export default medicalReportReducer;
