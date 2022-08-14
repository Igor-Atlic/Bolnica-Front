import * as actionType from "../actionTypes";
const numberOfAppointmentsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_NUMBER_OF_APPOINTMENTS:
      return action.data;
    default:
      return state;
  }
};

export default numberOfAppointmentsReducer;
