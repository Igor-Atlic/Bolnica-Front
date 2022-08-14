import {
  GET_ADMISSIONS,
  UPDATE_ADMISSION,
  CREATE_ADMISSION,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getAdmissions = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.getAdmissions(formData);
    dispatch({ type: GET_ADMISSIONS, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const searchAdmissions = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.searchAdmissions(formData);
    dispatch({ type: GET_ADMISSIONS, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateAdmission =
  (formData, toggleModalSuccess2, toggleModalError2) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.updateAdmission(formData);
      console.log(data);
      dispatch({ type: UPDATE_ADMISSION, data });
      if (toggleModalSuccess2) toggleModalSuccess2();
    } catch (error) {
      console.log(error);
      toggleModalError2();
    }
  };

export const createAdmission =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.createAdmission(formData);
      dispatch({ type: CREATE_ADMISSION, data });
      console.log(data);
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };
