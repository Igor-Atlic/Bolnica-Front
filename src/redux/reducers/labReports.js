import * as actionType from "../actionTypes";

const labReportsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_LAB_REPORTS:
      return action.data;
    case actionType.CREATE_LAB_REPORT:
      return [...state, action.data];
    case actionType.UPDATE_LAB_REPORT:
      return state.map((labReport) =>
        labReport.zakazaniPregledId !== action.id ? labReport : action.data
      );
    default:
      return state;
  }
};

export default labReportsReducer;
