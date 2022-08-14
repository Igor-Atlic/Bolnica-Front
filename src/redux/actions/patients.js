import {
  CREATE_PATIENT,
  DELETE_PATIENT,
  GET_PATIENTS,
  UPDATE_PATIENT,
  DELETE_FILTERED_PATIENT,
  SEARCH_PATIENTS,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getPatients = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPatients();
    dispatch({ type: GET_PATIENTS, data });
    dispatch({ type: SEARCH_PATIENTS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = (lbp) => async (dispatch) => {
  try {
    const { data } = await api.fetchPatient(lbp);
    dispatch({ type: GET_PATIENTS, data: [data] });
  } catch (error) {
    console.log(error);
  }
};

export const searchPatients = (searchValue) => async (dispatch) => {
  try {
    const { data } = await api.searchPatients(searchValue);
    dispatch({ type: SEARCH_PATIENTS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createPatient =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.createPatient(formData);
      dispatch({ type: CREATE_PATIENT, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const updatePatient =
  (formData, lbp, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.updatePatient(formData, lbp);
      dispatch({ type: UPDATE_PATIENT, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const deletePatient =
  (lbp, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      await api.deletePatient(lbp);
      dispatch({ type: DELETE_PATIENT, lbp });
      dispatch({ type: DELETE_FILTERED_PATIENT, lbp });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };
