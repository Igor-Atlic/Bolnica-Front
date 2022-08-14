import * as api from "../../api/index.js";
import {
  GET_PATIENTS_HISTORY,
  CREATE_PATIENT_HISTORY,
  GET_PATIENTS_VISITS,
  CREATE_PATIENT_VISITS,
} from "../actionTypes.js";

export const getPatientsHistory =
  (dateFrom, dateTo, lbp) => async (dispatch) => {
    try {
      const { data } = await api.fetchPatientsHistory(dateFrom, dateTo, lbp);
      dispatch({ type: GET_PATIENTS_HISTORY, data });
    } catch (error) {
      console.log(error);
    }
  };

export const createPatientHistory = (lbp, formData) => async (dispatch) => {
  try {
    const { data } = await api.createPatientHistory(lbp, formData);
    dispatch({ type: CREATE_PATIENT_HISTORY, data });
  } catch (error) {
    console.log(error);
  }
};

export const getPatientsVisits = (lbp) => async (dispatch) => {
  try {
    const { data } = await api.fetchPatientsVisits(lbp);
    dispatch({ type: GET_PATIENTS_VISITS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createPatientVisits = (lbp, formData) => async (dispatch) => {
  try {
    const { data } = await api.createPatientVisits(lbp, formData);
    dispatch({ type: CREATE_PATIENT_VISITS, data });
  } catch (error) {
    console.log(error);
  }
};
