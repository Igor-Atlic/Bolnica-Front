import {
  CREATE_STATE,
  DELETE_STATE,
  GET_STATE,
  GET_STATES,
  UPDATE_STATE,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getPatientStates = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.fetchPatientStates(formData);
    console.log(data);
    dispatch({ type: GET_STATES, data });
  } catch (error) {
    console.log(error);
  }
};

export const createPatientState =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.createPatientState(formData);
      dispatch({ type: CREATE_STATE, data });
      console.log(data);
      toggleModalSuccess();
    } catch (error) {
      toggleModalError();
      console.log(error);
    }
  };

export const updatePatientState =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.updatePatientState(formData);
      dispatch({ type: UPDATE_STATE, data });
      toggleModalSuccess();
    } catch (error) {
      toggleModalError("Doslo je do greške prilikom imene profila.");
      console.log(error);
    }
  };

export const deletePatientState =
  (lbz, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      await api.deletePatientState(lbz);
      dispatch({ type: DELETE_STATE, lbz });
      toggleModalSuccess();
    } catch (error) {
      toggleModalError();
      console.log(error);
    }
  };
