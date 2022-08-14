import * as actionType from "../actionTypes";

const demoReducer = (state = [], action) => {
    switch (action.type) {
        case actionType.GET_PATIENTS_VISITS:
            return action.data;
        case actionType.CREATE_PATIENTS_VISITS:
            return [...state, action.data];
        default:
            return state;
    }
};

export default demoReducer;