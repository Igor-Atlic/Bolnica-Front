import * as actionType from "../actionTypes";

const hospitalsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_HOSPITALS:
      return action.data;
    case actionType.CREATE_HOSPITAL:
      return [...state, action.data];
    case actionType.UPDATE_HOSPITAL:
      return state.map((hospital) =>
        hospital.zakazaniPregledId !== action.id ? hospital : action.data
      );
    default:
      return state;
  }
};

export default hospitalsReducer;
