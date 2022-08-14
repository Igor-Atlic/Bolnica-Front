import * as actionType from "../actionTypes";
const analysisResultReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_ANALYSIS_RESULTS:
      return action.data;
    case actionType.DELETE_ANALYSIS_RESULT:
      return state.filter((analysisResult) =>
        analysisResult.lbp !== action.lbp ? analysisResult : false
      );
    default:
      return state;
  }
};

export default analysisResultReducer;
