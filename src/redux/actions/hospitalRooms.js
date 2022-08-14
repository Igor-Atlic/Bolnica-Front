import { GET_HOSPITAL_ROOMS } from "../actionTypes";
import * as api from "../../api/index.js";

export const searchHospitalRooms = (pbo) => async (dispatch) => {
  try {
    const { data } = await api.searchHospitalRooms(pbo);
    dispatch({ type: GET_HOSPITAL_ROOMS, data });
  } catch (error) {
    console.log(error);
  }
};
