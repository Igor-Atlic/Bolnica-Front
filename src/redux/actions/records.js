import {
  CREATE_RECORD,
  GET_RECORDS,
  UPDATE_VACCINE,
  UPDATE_ALERGEN,
  UPDATE_RECORD,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getRecord = (lbp) => async (dispatch) => {
  try {
    const { data } = await api.fetchRecord(lbp);
    dispatch({ type: GET_RECORDS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createRecord = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createRecord(formData);
    dispatch({ type: CREATE_RECORD, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateRecord =
  (formData, toggleModalError, toggleModalSuccess) => async (dispatch) => {
    try {
      const { data } = await api.updateRecord(formData);
      dispatch({ type: UPDATE_RECORD, data });
      toggleModalSuccess("Uspešno izmenjeni podaci");
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const addVaccine =
  (formData, toggleModalError, toggleModalSuccess) => async (dispatch) => {
    try {
      const { data } = await api.addVaccine(formData);
      console.log({ ...data, naziv: formData.naziv });
      dispatch({
        type: UPDATE_VACCINE,
        data: { ...data, naziv: formData.naziv },
      });
      toggleModalSuccess("Uspešno dodata vakcina");
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const addAlergy =
  (formData, toggleModalError, toggleModalSuccess) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.addAlergen(formData);
      dispatch({
        type: UPDATE_ALERGEN,
        data: { ...data, naziv: formData.naziv },
      });
      toggleModalSuccess("Uspešno dodata alergija");
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };
