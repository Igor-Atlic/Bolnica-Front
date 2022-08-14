import { combineReducers } from "redux";

import demo from "./demo";
import appointments from "./appointments";
import employees from "./employee";
import records from "./records";
import diseases from "./diseases";
import examinations from "./examinations";
import labReports from "./labReports";
import departments from "./departments";
import patients from "./patients";
import medicalReports from "./medicalReports";
import patientsVisits from "./patientsVisits";
import dischargeLists from "./dischargeLists";
import patientsOfTheDepartment from "./patientsOfTheDepartment";
import patientStates from "./patientStates";
import admissions from "./admissions";
import analysisResults from "./analysisResults";
import filteredPatients from "./filteredPatients";
import referrals from "./referrals";
import hospitals from "./hospitals";
import loggedUser from "./auth";
import visits from "./visits";
import numberOfAppointments from "./numberOfAppointments";
import patientsAdmissions from "./patientsAdmissions";
import hospitalRooms from "./hospitalRooms";
import patientHistoryReducer from "./patientsOfTheDepartment";

export const reducers = combineReducers({
  demo,
  employees,
  patients,
  filteredPatients,
  appointments,
  records,
  loggedUser,
  departments,
  diseases,
  examinations,
  referrals,
  hospitals,
  labReports,
  visits,
  numberOfAppointments,
  patientsAdmissions,
  hospitalRooms,
  patientHistoryReducer,
  analysisResults,
  admissions,
  patientStates,
  patientsOfTheDepartment,
  dischargeLists,
  patientsVisits,
  medicalReports,
});
