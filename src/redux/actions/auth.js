import { LOGIN, LOGOUT } from "../actionTypes";
import * as api from "../../api/index.js";
import jwt from "jwt-decode";

export const login =
  (formData, navigate, toggleModalError) => async (dispatch) => {
    try {
      const { data } = await api.login(formData);
      const user = jwt(data);
      const roles = user.roles.split(",");
      localStorage.setItem("token", data);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch({ type: LOGIN, payload: user });
      if (roles.includes("ROLE_ADMIN")) navigate("/admin");
      else if (roles.includes("ROLE_DR_SPEC_POV")) navigate("/");
      else if (roles.includes("ROLE_MED_SESTRA")) navigate("/nurse");
      else if (roles.includes("ROLE_LABORATORIJSKI_TEHNICAR"))
        navigate("/technician");
      else if (roles.includes("ROLE_MEDICINSKI_BIOHEMICAR"))
        navigate("/biochemist");
      else if (roles.includes("ROLE_RECEPCIONER")) navigate("/recepcionist");
    } catch (error) {
      toggleModalError();
      console.log(error);
    }
  };

export const logout = (navigate) => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    dispatch({ type: LOGOUT });
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const resetUser = () => async (dispatch) => {
  try {
    const data = localStorage.getItem("token");
    const user = jwt(data);
    dispatch({ type: LOGIN, payload: user });
  } catch (error) {
    console.log(error);
  }
};
