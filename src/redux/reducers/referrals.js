import * as actionType from "../actionTypes";

const referralsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_REFERRALS:
      return action.data;
    case actionType.CREATE_REFERRAL:
      return [...state, action.data];
    case actionType.UPDATE_REFERRAL:
      return state.map((referral) =>
        referral.zakazaniPregledId !== action.id ? referral : action.data
      );
    case actionType.DELETE_REFERRAL:
      return state.filter((referral) =>
        referral.uputId !== action.uputId ? referral : false
      );
    default:
      return state;
  }
};

export default referralsReducer;
