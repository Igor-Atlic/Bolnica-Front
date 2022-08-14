import * as actionType from "../actionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return action.payload;
    case actionType.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;
