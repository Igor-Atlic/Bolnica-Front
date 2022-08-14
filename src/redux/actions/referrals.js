import {
  GET_REFERRALS,
  CREATE_REFERRAL,
  DELETE_REFERRAL,
  UPDATE_REFERRAL,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getReferrals = (lbp) => async (dispatch) => {
  try {
    const { data } = await api.fetchReferrals({ lbp });
    dispatch({ type: GET_REFERRALS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getUnprocessedReferrals = (lbp) => async (dispatch) => {
  try {
    const { data } = await api.fetchUnprocessedReferrals(lbp);
    dispatch({ type: GET_REFERRALS, data });
  } catch (error) {
    console.log(error);
  }
};

export const createReferral =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      console.log(formData);
      const { data } = await api.createReferral(formData);
      console.log(data);
      dispatch({ type: CREATE_REFERRAL, data });
      toggleModalSuccess();
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const updateReferral = (referralData) => async (dispatch) => {
  try {
    const { data } = await api.updateReferral(referralData);
    dispatch({
      type: UPDATE_REFERRAL,
      id: data.zakazaniPregledId,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReferral =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      await api.deleteReferral(formData);
      dispatch({ type: DELETE_REFERRAL, uputId: formData });
      toggleModalSuccess("Uspešno obrisan uput.");
    } catch (error) {
      console.log(error);
      toggleModalError();
    }
  };

export const searchReferrals = (lbp, type, status) => async (dispatch) => {
  try {
    const { data } = await api.searchReferrals(lbp, type, status);
    dispatch({ type: GET_REFERRALS, data });
  } catch (error) {
    console.log(error);
  }
};
