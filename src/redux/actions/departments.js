import { GET_DEPARTMENTS } from "../actionTypes";
import * as api from "../../api/index.js";

export const getDepartments = () => async (dispatch) => {
	try {
		const { data } = await api.fetchDepartments();
		dispatch({ type: GET_DEPARTMENTS, data });
	} catch (error) {
		console.log(error);
	}
};
