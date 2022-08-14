import {
  GET_APPOINTMENTS,
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getAppointments = (lbz) => async (dispatch) => {
  try {
    const { data } = await api.fetchAppointments({ lbz });
    dispatch({ type: GET_APPOINTMENTS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createAppointment =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.createAppointment(formData);
      dispatch({ type: CREATE_APPOINTMENT, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const updateAppointment = (appointmentData) => async (dispatch) => {
  try {
    const { data } = await api.updateAppointment(appointmentData);
    dispatch({
      type: UPDATE_APPOINTMENT,
      id: data.zakazaniPregledId,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteAppointment(id);
    dispatch({ type: DELETE_APPOINTMENT, data });
  } catch (error) {
    console.log(error);
  }
};
