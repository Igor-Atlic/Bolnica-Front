import * as actionType from "../actionTypes";
const dischargeListsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_DISCHARGE_LISTS:
      return action.data;
    case actionType.GET_DISCHARGE_LIST:
      return [action.data];
    case actionType.CREATE_DISCHARGE_LIST:
      return [...state, action.data];
    case actionType.UPDATE_DISCHARGE_LIST:
      return state.map((dischargeList) =>
        dischargeList.lbz !== action.data.lbz ? dischargeList : action.data
      );
    case actionType.DELETE_DISCHARGE_LIST:
      return state.filter((dischargeList) =>
        dischargeList.lbz !== action.lbz ? dischargeList : false
      );

    default:
      return state;
  }
};

export default dischargeListsReducer;
