import * as actionType from "../actionTypes";

const statesReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_STATES:
      return action.data;
    case actionType.CREATE_STATE:
      return [...state, action.data];
    case actionType.UPDATE_STATE:
      return state.map((patientState) =>
        patientState.stanjePacijentaId !== action.id
          ? patientState
          : action.data
      );
    case actionType.DELETE_STATE:
      return state.filter((patientState) =>
        patientState.uputId !== action.uputId ? patientState : false
      );
    default:
      return state;
  }
};

export default statesReducer;
