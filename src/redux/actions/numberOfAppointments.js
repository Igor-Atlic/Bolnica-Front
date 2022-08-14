import { GET_NUMBER_OF_APPOINTMENTS } from "../actionTypes";
import * as api from "../../api/index.js";

export const getNumberofAppointments = (dateNum) => async (dispatch) => {
  try {
    const { data } = await api.fetchNumberOfLabAppointments({ dateNum });
    dispatch({ type: GET_NUMBER_OF_APPOINTMENTS, data });
  } catch (error) {
    console.log(error);
  }
};
