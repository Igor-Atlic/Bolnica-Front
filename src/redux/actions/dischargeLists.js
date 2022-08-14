import {
  GET_DISCHARGE_LISTS,
  UPDATE_DISCHARGE_LIST,
  CREATE_DISCHARGE_LIST,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getDischargeLists = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.getDischargeLists(formData);
    dispatch({ type: GET_DISCHARGE_LISTS, data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateDischargeList = (id, status) => async (dispatch) => {
  try {
    const { data } = await api.updateDischargeList(id, status);
    dispatch({ type: UPDATE_DISCHARGE_LIST, data });
  } catch (error) {
    console.log(error);
  }
};

export const createDischargeList = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.createDischargeList(formData);
    console.log(data);
    dispatch({ type: CREATE_DISCHARGE_LIST, data });
  } catch (error) {
    console.log(error);
  }
};
