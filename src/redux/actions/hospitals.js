import {
  GET_HOSPITALS,
  CREATE_HOSPITAL,
  DELETE_HOSPITAL,
  UPDATE_HOSPITAL,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getHospitals = () => async (dispatch) => {
  try {
    const { data } = await api.fetchHospitals();
    dispatch({ type: GET_HOSPITALS, data });
  } catch (error) {
    console.log(error);
  }
};

// export const getUnprocessedHospitals = (lbp) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchUnprocessedHospitals(lbp);
//     dispatch({ type: GET_HOSPITALS, data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createHospital = (formData) => async (dispatch) => {
//   try {
//     const { data } = await api.createHospital(formData);
//     dispatch({ type: CREATE_HOSPITAL, data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateHospital = (hospitalData) => async (dispatch) => {
//   try {
//     const { data } = await api.updateHospital(hospitalData);
//     dispatch({
//       type: UPDATE_HOSPITAL,
//       id: data.zakazaniPregledId,
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteHospital = (formData) => async (dispatch) => {
//   try {
//     const { data } = await api.deleteHospital(formData);
//     dispatch({ type: DELETE_HOSPITAL, data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const searchHospitals = (lbp, type, status) => async (dispatch) => {
//   try {
//     const { data } = await api.searchHospitals(lbp, type, status);
//     dispatch({ type: GET_HOSPITALS, data });
//   } catch (error) {
//     console.log(error);
//   }
// };
