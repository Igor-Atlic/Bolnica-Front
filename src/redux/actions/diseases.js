import { GET_DISEASES } from "../actionTypes";
import * as api from "../../api/index.js";

export const getDiseases = (lbp, dijagnoza) => async (dispatch) => {
  try {
    const { data } = await api.fetchDiseases(lbp, dijagnoza);
    dispatch({ type: GET_DISEASES, data });
  } catch (error) {
    console.log(error);
  }
};
