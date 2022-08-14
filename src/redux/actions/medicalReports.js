import {
  GET_MEDICAL_REPORTS,
  UPDATE_MEDICAL_REPORT,
  CREATE_MEDICAL_REPORT,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getMedicalReports = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.getMedicalReports(formData);
    dispatch({ type: GET_MEDICAL_REPORTS, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateMedicalReport = (id, status) => async (dispatch) => {
  try {
    const { data } = await api.updateMedicalReport(id, status);
    dispatch({ type: UPDATE_MEDICAL_REPORT, data });
  } catch (error) {
    console.log(error);
  }
};

export const createMedicalReport =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.createMedicalReport(formData);
      console.log(data);
      dispatch({ type: CREATE_MEDICAL_REPORT, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };
