import * as actionType from "../actionTypes";

const examinationsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_EXAMINATIONS:
      return action.data;
    default:
      return state;
  }
};

export default examinationsReducer;
