import { GET_ANALYSIS_RESULTS, UPDATE_ANALYSIS_RESULT } from "../actionTypes";
import * as api from "../../api/index.js";

export const getAnalysisResults = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchAnalysisResults(id);
    dispatch({ type: GET_ANALYSIS_RESULTS, data });
  } catch (error) {
    console.log(error);
  }
};

export const saveAnalysisResult =
  (resultData, toggleModalResult) => async (dispatch) => {
    try {
      const { data } = await api.saveAnalysisResultApi(resultData);
      console.log(resultData);
      dispatch({ type: UPDATE_ANALYSIS_RESULT, data });
      toggleModalResult();
    } catch (error) {
      console.log(error);
    }
  };
