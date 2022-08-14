import * as actionType from "../actionTypes";

const demoReducer = (state = [], action) => {
	switch (action.type) {
		case actionType.GET_DEMOS:
			return action.data;
		case actionType.CREATE_DEMO:
		case actionType.GET_DEMO:
			return [...state, action.data];
		case actionType.UPDATE_DEMO:
			return [
				...state,
				state.map((demo) =>
					demo.id !==action.id ? demo : action.data
				),
			];
		case actionType.DELETE_DEMO:
			return [
				...state,
				state.filter((demo) => (demo.id !== action.id ? demo : false)),
			];
		default:
			return state;
	}
};

export default demoReducer;
