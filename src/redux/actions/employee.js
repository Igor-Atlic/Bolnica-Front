import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from "../actionTypes";
import * as api from "../../api/index.js";

export const getEmployees = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployees();
    dispatch({ type: GET_EMPLOYEES, payload: { data, obrisan: true } });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployee = (lbz) => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployee(lbz);
    dispatch({ type: GET_EMPLOYEE, data });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeesDep = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployeesDep(id);
    dispatch({
      type: GET_EMPLOYEES,
      payload: { data, obrisan: true },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.createEmployee(formData);
      dispatch({ type: CREATE_EMPLOYEE, data });
      toggleModalSuccess();
    } catch (error) {
      toggleModalError();
      console.log(error);
    }
  };

export const updateEmployee =
  (formData, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.updateEmployee(formData);
      dispatch({ type: UPDATE_EMPLOYEE, data });
      toggleModalSuccess();
    } catch (error) {
      toggleModalError("Doslo je do greške prilikom imene profila.");
      console.log(error);
    }
  };

export const searchEmployees = (searchValue) => async (dispatch) => {
  try {
    console.log(searchValue);
    const { data } = await api.searchEmployees(searchValue);
    dispatch({
      type: GET_EMPLOYEES,
      payload: { data, obrisan: searchValue.obrisan },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee =
  (lbz, toggleModalSuccess, toggleModalError) => async (dispatch) => {
    try {
      await api.deleteEmployee(lbz);
      dispatch({ type: DELETE_EMPLOYEE, lbz });
      toggleModalSuccess();
    } catch (error) {
      toggleModalError();
      console.log(error);
    }
  };
