import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import MedicalReport from "../../../components/PatientWorkspace/MedicalReport";
import StateHistory from "../../../components/PatientWorkspace/StateHistory";
import Referral from "../../../components/PatientWorkspace/Referral";
import PatientRecord from "../../../components/PatientWorkspace/PatientRecord";
import DischargeList from "../../../components/PatientWorkspace/DischargeList";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getRecord } from "../../../redux/actions/records";
import { getDiseases } from "../../../redux/actions/diseases";
import { getExaminations } from "../../../redux/actions/examinations";
import { getAppointments } from "../../../redux/actions/appointments";
import { getHospitals } from "../../../redux/actions/hospitals";
import { getDepartments } from "../../../redux/actions/departments";
import { getPatients } from "../../../redux/actions/patients";
import { getEmployees } from "../../../redux/actions/employee";
import { getReferrals } from "../../../redux/actions/referrals";
import { searchLabReports } from "../../../redux/actions/labReports";
import { getDischargeLists } from "../../../redux/actions/dischargeLists";
import { getMedicalReports } from "../../../redux/actions/medicalReports";

const PatientWorkspacePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const examinations = useSelector((state) => state.examinations);
  const employees = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments);
  const record = useSelector((state) => state.records[0]);
  const diseases = useSelector((state) => state.diseases);
  const referrals = useSelector((state) => state.referrals);
  const patients = useSelector((state) => state.patients);
  const dischargeLists = useSelector((state) => state.dischargeLists);
  const medicalReports = useSelector((state) => state.medicalReports);
  const labReports = useSelector((state) => state.labReports);

  const [isTab1, setTab1] = useState(true);
  const [isTab2, setTab2] = useState(false);
  const [isTab3, setTab3] = useState(false);
  const [isTab4, setTab4] = useState(false);
  const [isTab5, setTab5] = useState(false);

  const [lbp, setLbp] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [referralTableContent, setReferralTableContent] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  const [dischargeListsTableContent, setDischargeListsTableContent] = useState(
    []
  );

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const values = pathParts[pathParts.length - 1];
    const perm = values.split(",");
    setLbp(perm[5]);
    setIme(perm[7]);
    setPrezime(perm[9]);
    setJmbg(perm[11]);
  }, []);

  useEffect(() => {
    const doctorLocal = JSON.parse(localStorage.getItem("loggedUser"));
    const pathParts = location.pathname.split("/");
    const values = pathParts[pathParts.length - 1];
    const perm = values.split(",");
    dispatch(getRecord(perm[5]));
    dispatch(getDiseases(perm[5], { dijagnoza: "string" }));
    dispatch(getExaminations(perm[5]));
    // dispatch(getLabReports(perm[5]));
    dispatch(getAppointments(doctorLocal.LBZ));
    dispatch(getHospitals());
    dispatch(getDepartments());
    dispatch(getPatients());
    dispatch(getEmployees());
    dispatch(getDischargeLists({ lbp: perm[5] }));
    dispatch(getMedicalReports({ lbp: perm[5] }));
    dispatch(getReferrals(perm[5]));
    dispatch(searchLabReports({}));
  }, []);

  useEffect(() => {
    if (referrals.length > 0 && employees.length > 0 && departments.length > 0)
      setReferralTableContent(
        referrals.map((referral) => {
          const employee = employees.find(
            (employee) => employee.lbz === referral.lbz
          );
          const izOdeljenja = departments.find(
            (department) => department.odeljenjeId === referral.izOdeljenjaId
          );
          const zaOdeljenje = departments.find(
            (department) => department.odeljenjeId === referral.zaOdeljenjeId
          );
          return {
            ...referral,
            ...employee,
            izOdeljenjaNaziv: izOdeljenja ? izOdeljenja.naziv : "",
            zaOdeljenjeNaziv: zaOdeljenje ? zaOdeljenje.naziv : "",
          };
        })
      );
  }, [referrals, employees, departments]);

  useEffect(() => {
    if (patients.length > 0 && labReports.length > 0) {
      setTableContent(
        labReports.map((labReport) => {
          const patient = patients.find((patient) =>
            patient.lbp === labReport.lbp ? patient : false
          );
          return { ...labReport, ...patient };
        })
      );
    }
  }, [patients, labReports]);

  useEffect(() => {
    if (dischargeLists) {
      setDischargeListsTableContent(
        dischargeLists.map((dischargeList) => {
          return { ...dischargeList.otpusnaLista };
        })
      );
    }
  }, [dischargeLists]);

  const toggleClass1 = () => {
    if (!isTab1) {
      setTab1(!isTab1);
      if (isTab2) setTab2(!isTab2);
      else if (isTab3) setTab3(!isTab3);
      else if (isTab4) setTab4(!isTab4);
      else if (isTab5) setTab5(!isTab5);
    }
  };

  const toggleClass2 = () => {
    if (!isTab2) {
      setTab2(!isTab2);

      if (isTab1) setTab1(!isTab1);
      else if (isTab3) setTab3(!isTab3);
      else if (isTab4) setTab4(!isTab4);
      else if (isTab5) setTab5(!isTab5);
    }
  };

  const toggleClass3 = () => {
    if (!isTab3) {
      setTab3(!isTab3);
      if (isTab1) setTab1(!isTab1);
      else if (isTab2) setTab2(!isTab2);
      else if (isTab4) setTab4(!isTab4);
      else if (isTab5) setTab5(!isTab5);
    }
  };

  const toggleClass4 = () => {
    if (!isTab4) {
      setTab4(!isTab4);
      if (isTab1) setTab1(!isTab1);
      else if (isTab2) setTab2(!isTab2);
      else if (isTab3) setTab3(!isTab3);
      else if (isTab5) setTab5(!isTab5);
    }
  };

  const toggleClass5 = () => {
    if (!isTab5) {
      setTab5(!isTab5);
      if (isTab1) setTab1(!isTab1);
      else if (isTab2) setTab2(!isTab2);
      else if (isTab3) setTab3(!isTab3);
      else if (isTab4) setTab4(!isTab4);
    }
  };

  return (
    <div>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("doctor", -1)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <ul className="nav nav-tabs nav-justified">
          <li className="nav-item">
            <button
              className={` ${isTab1 ? "active" : "disabled"}`}
              onClick={toggleClass1}
            >
              Izveštaj
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` ${isTab2 ? "active" : "disabled"}`}
              onClick={toggleClass2}
            >
              Stanja
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` ${isTab3 ? "active" : "disabled"}`}
              onClick={toggleClass3}
            >
              Uput
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` ${isTab4 ? "active" : "disabled"}`}
              onClick={toggleClass4}
            >
              Karton
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` ${isTab5 ? "active" : "disabled"}`}
              onClick={toggleClass5}
            >
              Otpusna lista
            </button>
          </li>
        </ul>
        <form
          className="form-custom familyFix"
          style={{ marginBottom: "30px" }}
        >
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              name="LBP"
              value={lbp}
              disabled
            />

            <input
              type="text"
              className="margin-right"
              name="ime"
              value={ime}
              disabled
            />

            <input
              type="text"
              className="margin-right"
              name="Prezime"
              value={prezime}
              disabled
            />

            <input
              type="text"
              className="margin-left"
              name="jmbg"
              value={jmbg}
              disabled
            />
          </div>
        </form>
        {isTab1 && <MedicalReport lbp={lbp} />}
        {isTab2 && <StateHistory lbp={lbp} />}
        {isTab3 && <Referral lbp={lbp} toggleClass4={toggleClass4} />}
        {isTab4 && (
          <PatientRecord
            lbp={lbp}
            record={record}
            diseases={diseases}
            examinations={examinations}
            referrals={referrals}
            dischargeLists={dischargeLists}
            labReports={labReports}
            referralTableContent={referralTableContent}
            medicalReports={medicalReports}
            dischargeListsTableContent={dischargeListsTableContent}
            tableContent={tableContent}
          />
        )}
        {isTab5 && <DischargeList lbp={lbp} />}
      </div>
    </div>
  );
};

export default PatientWorkspacePage;
