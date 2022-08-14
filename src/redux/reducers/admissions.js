import * as actionType from "../actionTypes";

const labVisitReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_ADMISSIONS:
      return action.data;
    case actionType.UPDATE_ADMISSION: {
      console.log(action.data);
      return state.map((admission) =>
        admission.zakazaniTerminPrijemaId !==
        action.data.zakazaniTerminPrijemaId
          ? admission
          : action.data
      );
    }
    case actionType.CREATE_ADMISSION:
      return [...state, action.data];
    default:
      return state;
  }
};

export default labVisitReducer;
