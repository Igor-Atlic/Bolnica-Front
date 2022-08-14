import {
  GET_LAB_VISITS,
  UPDATE_LAB_VISITS,
  CREATE_LAB_VISIT,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const searchLabVisits = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.searchLabVisits(formData);
    dispatch({ type: GET_LAB_VISITS, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateLabVisits =
  (formData, toggleModalSuccess2, toggleModalError2) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.updateLabVisits(formData);
      console.log(data);
      dispatch({ type: UPDATE_LAB_VISITS, data });
      if (toggleModalSuccess2) toggleModalSuccess2();
    } catch (error) {
      console.log(error);
      toggleModalError2();
    }
  };

export const createVisit =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.createVisit(formData);
      dispatch({ type: CREATE_LAB_VISIT, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };
