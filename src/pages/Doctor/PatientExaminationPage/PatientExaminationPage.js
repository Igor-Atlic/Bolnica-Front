import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router";
import { Button } from "reactstrap";
import "./styles.css";
import ExaminationForm from "../../../components/ExaminationForm/ExaminationForm";
import MedicalRecord from "../../../components/MedicalRecord/MedicalRecord";
import { useDispatch, useSelector } from "react-redux";
import { createRecord, getRecord } from "../../../redux/actions/records";
import { getExaminations } from "../../../redux/actions/examinations";
import { getDiseases } from "../../../redux/actions/diseases";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { getReferrals } from "../../../redux/actions/referrals";
import {
  updateAppointment,
  getAppointments,
} from "../../../redux/actions/appointments";
import {
  getLabReports,
  searchLabReports,
} from "../../../redux/actions/labReports";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CreateRefferal from "../../../components/CreateRefferal/CreateRefferal";
import { getHospitals } from "../../../redux/actions/hospitals";
import { getDepartments } from "../../../redux/actions/departments";
import { getEmployees } from "../../../redux/actions/employee";
import { getPatient, getPatients } from "../../../redux/actions/patients";
import { getDischargeLists } from "../../../redux/actions/dischargeLists";
import { getMedicalReports } from "../../../redux/actions/medicalReports";

const PatientExamination = () => {
  const location = useLocation();
  const [lbp, setLbp] = useState();
  const [doctor, setDoctor] = useState();
  const [tabNumber, setTabNumber] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examinations = useSelector((state) => state.examinations);
  const employees = useSelector((state) => state.employees);
  const appointments = useSelector((state) => state.appointments);
  const departments = useSelector((state) => state.departments);
  const record = useSelector((state) => state.records[0]);
  const diseases = useSelector((state) => state.diseases);
  const referrals = useSelector((state) => state.referrals);
  const patients = useSelector((state) => state.patients);
  const dischargeLists = useSelector((state) => state.dischargeLists);
  const medicalReports = useSelector((state) => state.medicalReports);
  const hospitals = useSelector((state) => state.hospitals);
  const labReports = useSelector((state) => state.labReports);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [referralTableContent, setReferralTableContent] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  const [dischargeListsTableContent, setDischargeListsTableContent] = useState(
    []
  );

  useEffect(() => {
    const doctorLocal = JSON.parse(localStorage.getItem("loggedUser"));
    if (doctorLocal) {
      setDoctor(doctorLocal);
    } else navigate("/login");
    const pathParts = location.pathname.split("/");
    setLbp(pathParts[pathParts.length - 1]);
    dispatch(getRecord(pathParts[pathParts.length - 1]));
    dispatch(
      getDiseases(pathParts[pathParts.length - 1], { dijagnoza: "string" })
    );
    dispatch(getExaminations(pathParts[pathParts.length - 1]));
    // dispatch(getLabReports(pathParts[pathParts.length - 1]));
    dispatch(getAppointments(doctorLocal.LBZ));
    dispatch(getHospitals());
    dispatch(getDepartments());
    dispatch(getPatients());
    dispatch(getEmployees());
    dispatch(getDischargeLists({ lbp: pathParts[pathParts.length - 1] }));
    dispatch(getMedicalReports({ lbp: pathParts[pathParts.length - 1] }));
    dispatch(getReferrals(pathParts[pathParts.length - 1]));
    dispatch(searchLabReports({}));
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      const currentAppointment = appointments.find(
        (appointment) => appointment.statusPregleda === "U_TOKU"
      );
      if (!currentAppointment) swapTabsForver();
      else {
        setTabNumber(0);
        setDisabled(false);
      }
    } else {
      swapTabsForver();
    }
  }, [appointments]);

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

  const saveExamination = (formData) => {
    const currentAppointment = appointments.find(
      (appointment) => appointment.statusPregleda === "U_TOKU"
    );
    dispatch(
      updateAppointment({
        appointmentId: currentAppointment.zakazaniPregledId,
        appointmentStatus: "ZAVRSENO",
      })
    );
    dispatch(
      createRecord({
        ...formData,
        lbp,
        lbz: doctor.LBZ,
        sadasnjaBolest: null,
      })
    );
    dispatch(getExaminations(lbp));
    swapTabsForver();
  };

  const swapTabs = (number) => {
    setTabNumber(number);
  };
  const swapTabsForver = () => {
    setTabNumber(2);
    setDisabled(true);
  };
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);

  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("doctor", 0)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <CustomModalAnswer
          title="Potvrda"
          content="Da li želite da završite pregled?"
          toggleModal={toggleModalSuccess}
          isOpen={modalSuccess}
          handleClick={saveExamination}
        />
        <CustomModal
          title="Greška"
          content="Doslo je do greške prilikom završavanja pregleda."
          toggleModal={toggleModalError}
          isOpen={modalError}
        />
        <Header
          avatarUrl={"nikolaSlika 1.jpg"}
          welcomeMsg={"Dobro jutro"}
          userName={"Dr. Paun"}
          userTitle={"Kardiolog"}
          day={format(new Date(), "d")}
          date={format(new Date(), "d MMMM, yyyy")}
        />
        {record && appointments && (
          <>
            <div className="tabButtons">
              <Button
                color="primary"
                outline={tabNumber !== 0}
                onClick={() => swapTabs(0)}
                disabled={disabled}
                className="negateClass"
              >
                Zdravstveni pregled
              </Button>
              <Button
                color="primary"
                outline={tabNumber !== 1}
                onClick={() => swapTabs(1)}
              >
                Uput
              </Button>
              <Button
                color="primary"
                outline={tabNumber !== 2}
                onClick={() => swapTabs(2)}
              >
                Zdravstveni karton
              </Button>
            </div>
            <div className="main">
              {record && record.pacijent && examinations && diseases ? (
                tabNumber === 0 ? (
                  <ExaminationForm
                    saveExamination={saveExamination}
                    record={record}
                  />
                ) : tabNumber === 1 ? (
                  <CreateRefferal
                    record={record}
                    setTabNumber={setTabNumber}
                    hospitals={hospitals}
                    departments={departments}
                  />
                ) : (
                  <MedicalRecord
                    record={record}
                    diseases={diseases}
                    examinations={examinations}
                    referrals={referrals}
                    labReports={labReports}
                    referralTableContent={referralTableContent}
                    tableContent={tableContent}
                    dischargeListsTableContent={dischargeListsTableContent}
                    dischargeLists={dischargeLists}
                    medicalReports={medicalReports}
                    lbp={lbp}
                  />
                )
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PatientExamination;
