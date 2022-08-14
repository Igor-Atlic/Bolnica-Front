import * as actionType from "../actionTypes";

const demoReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_DISEASES:
      return action.data;
    default:
      return state;
  }
};

export default demoReducer;
