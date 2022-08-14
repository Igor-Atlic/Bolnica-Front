import * as actionType from "../actionTypes";

const demoReducer = (state = [], action) => {
	switch (action.type) {
		case actionType.GET_DEPARTMENTS:
			return action.data;
		default:
			return state;
	}
};

export default demoReducer;
