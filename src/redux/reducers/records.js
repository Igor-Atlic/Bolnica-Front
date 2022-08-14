import * as actionType from "../actionTypes";

const recordReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.GET_RECORDS:
      return [...state, action.data];
    case actionType.GET_RECORD:
      return [...state, action.data];
    case actionType.UPDATE_EMPLOYEE:
      return state.map((employee) =>
        employee.zdravstveniKartonId !== action.data.zdravstveniKartonId
          ? employee
          : action.data
      );
    case actionType.UPDATE_ALERGEN:
      return state.map((record) => {
        if (record.zdravstveniKartonId !== action.data.zdravstveniKartonId) {
          return record;
        } else {
          console.log(record, action);
          record.alergeni.push({
            alergen: action.data.naziv,
            id: record.alergeni.length,
            zdravstveniKartonId: action.data.zdravstveniKartonId,
          });
          return record;
        }
      });
    case actionType.UPDATE_VACCINE:
      return state.map((record) => {
        if (record.zdravstveniKartonId !== action.data.zdravstveniKartonId) {
          return record;
        } else {
          console.log(record, action);
          record.vakcinacije.push({ ...action.data });
          return record;
        }
      });
    default:
      return state;
  }
};

export default recordReducer;
