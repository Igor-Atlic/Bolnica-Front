import * as actionType from "../actionTypes";

const labVisitReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_LAB_VISITS:
      return action.data;
    case actionType.UPDATE_LAB_VISITS: {
      console.log(action.data);
      return state.map((labVisit) =>
        labVisit.zakazanLaboratorijskiPregledId !==
        action.data.zakazanLaboratorijskiPregledId
          ? labVisit
          : action.data
      );
    }
    case actionType.CREATE_LAB_VISIT:
      return [...state, action.data];
    default:
      return state;
  }
};

export default labVisitReducer;
