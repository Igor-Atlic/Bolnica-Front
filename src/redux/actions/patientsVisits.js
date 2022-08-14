import { CREATE_PATIENTS_VISITS, GET_PATIENTS_VISITS } from "../actionTypes";
import * as api from "../../api/index.js";

export const getPatientsVisits = (lbp) => async (dispatch) => {
  try {
    const { data } = await api.fetchPatientsVisits(lbp);
    dispatch({ type: GET_PATIENTS_VISITS, data });
  } catch (error) {
    console.log(error);
  }
};
export const createPatientsVisits =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.createPatientVisit(formData);
      dispatch({ type: CREATE_PATIENTS_VISITS, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };
