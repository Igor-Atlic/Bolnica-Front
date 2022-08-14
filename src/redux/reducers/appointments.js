import * as actionType from "../actionTypes";

const appointmentsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_APPOINTMENTS:
      return action.data;
    case actionType.CREATE_APPOINTMENT:
      return [...state, action.data];
    case actionType.UPDATE_APPOINTMENT:
      return state.map((appointment) =>
        appointment.zakazaniPregledId !== action.id ? appointment : action.data
      );
    default:
      return state;
  }
};

export default appointmentsReducer;
