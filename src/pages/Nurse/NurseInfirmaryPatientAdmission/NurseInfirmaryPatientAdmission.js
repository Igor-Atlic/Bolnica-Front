import React from "react";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState } from "react";
import "./styles.css";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  searchPatientsAdmissions,
  updatePatientAdmission,
  createPatientAdmission,
} from "../../../redux/actions/patientsAdmissions";
import { searchHospitalRooms } from "../../../redux/actions/hospitalRooms";
import { getEmployeesDep } from "../../../redux/actions/employee";
import CustomModal from "../../../components/CustomModal/CustomModal";
import {
  getReferrals,
  getUnprocessedReferrals,
  searchReferrals,
} from "../../../redux/actions/referrals";
import { Dropdown } from "react-bootstrap";
import { getPatients } from "../../../redux/actions/patients";
import { getDepartments } from "../../../redux/actions/departments";
import {
  getAdmissions,
  updateAdmission,
} from "../../../redux/actions/admissions";
import { useNavigate } from "react-router";

const initialStateFormLbp2 = {
  lbpForm2: "",
};

const initialStateFormLbp1 = {
  lbpForm1: "",
};

const NurseInfirmaryPatientAdmission = () => {
  let tab;
  let dateValue = new Date();
  let stepOneTable;
  let stepTwoTable;
  let stepThreeDropdown;
  let stepFourInput;

  let pbo;
  let lbp;

  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formLbp2, setFormLbp2] = useState(initialStateFormLbp2);
  const [formLbp1, setFormLbp1] = useState(initialStateFormLbp1);
  const [valueLbp2, setValueLbp2] = useState("");
  const [valueLbp1, setValueLbp1] = useState("");

  const [referralId, setReferralId] = useState();
  const [referralDiagnosis, setReferralDiagnosis] = useState();
  const [hospitalRoomId, setHospitalRoomId] = useState();
  const [doctorId, setDoctorId] = useState("");
  const [note, setNote] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const employees = useSelector((state) => state.employees);
  const patients = useSelector((state) => state.patients);
  const admissions = useSelector((state) => state.admissions);
  const departments = useSelector((state) => state.departments);
  const referrals = useSelector((state) => state.referrals);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [tableContent, setTableContent] = useState([]);
  const [referralTableContent, setReferralTableContent] = useState([]);
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDepartments());
    dispatch(getAdmissions({}));
    dispatch(searchPatientsAdmissions({}));
    dispatch(searchHospitalRooms(pbo));
    dispatch(getEmployeesDep(pbo));
  }, []);

  useEffect(() => {
    if (
      patients.length > 0 &&
      admissions.length > 0 &&
      departments.length > 0
    ) {
      setTableContent(
        admissions.map((admission) => {
          const patient = patients.find((patient) =>
            patient.lbp === admission.lbpPacijenta ? patient : false
          );
          const odeljenje = departments.find(
            (department) => department.odeljenjeId === admission.odeljenjeId
          );
          return { ...admission, ...patient, ...odeljenje };
        })
      );
    }
  }, [patients, admissions, departments]);

  useEffect(() => {
    if (
      referrals.length > 0 &&
      employees.length > 0 &&
      departments.length > 0
    ) {
      setReferralTableContent(
        referrals
          .filter((referral) =>
            referral.tip === "STACIONAR" ? referral : false
          )
          .map((referral) => {
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
    }
  }, [referrals, employees, departments]);
  console.log(referralTableContent);

  const [isClicked1, setClicked1] = useState(true);
  const [isClicked2, setClicked2] = useState(false);

  const toggleClass1 = () => {
    if (!isClicked1) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
    setValueLbp1("");
    setDisable(true);
  };

  const toggleClass2 = () => {
    setValueLbp2("");
    if (!isClicked2) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
    setDisable(true);
  };
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);

  function undoStepOne() {
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
    setStepFour(false);
    setSelectedDoctor({});
    setNote("");
  }

  function handleButtonCanceled(entry) {
    console.log(entry);
    dispatch(updateAdmission({ id: entry[0][1], status: "OTKAZAN" }));
  }

  function handleAcceptAdmission(entry) {
    console.log(entry);
    dispatch(updateAdmission({ id: entry[0][1], status: "REALIZOVAN" }));
    setClicked2(true);
    setClicked1(false);
    setValueLbp2(entry[1][1]);
    setDisable(false);
    dispatch(getUnprocessedReferrals(entry[1][1]));
  }

  const handleChangeLbp1 = (e) => {
    setFormLbp1({ ...formLbp1, [e.target.name]: e.target.value });
    setValueLbp1(e.target.value);
    setDisable(e.target.value === "");
    dispatch(getAdmissions({ lbp: formLbp1 }));
  };

  const handleRowClick = () => {};

  const handleSubmitLbp2 = (e) => {
    e.preventDefault();
  };

  const handleChangeLbp2 = (e) => {
    setFormLbp2({ ...formLbp2, [e.target.name]: e.target.value });
    setValueLbp2(e.target.value);
    setDisable(e.target.value === "");
    dispatch(getUnprocessedReferrals(e.target.value));
  };
  console.log(referrals);

  const handleSubmitAdmission = (e) => {
    e.preventDefault();

    dispatch(
      createPatientAdmission(
        {
          lbp: formLbp2.lbp,
          uputId: referralId,
          uputnaDijagnoza: referralDiagnosis,
          bolnickaSobaId: hospitalRoomId,
          lbzLekara: doctorId,
          note,
        },
        toggleModalSuccess,
        toggleModalError
      )
    );
  };

  const handleChooseReferral = (key, entry) => {
    setStepOne(false);
    setReferralDiagnosis(entry[4][1]);
    setReferralId(entry[0][1]);
    setStepTwo(true);
  };

  const handleChooseRoom = (key, entry) => {
    setStepTwo(false);
    setHospitalRoomId(entry[0][1]);
    setStepThree(true);
  };

  const handleChooseDoctor = (key) => {
    setStepThree(false);
    const newDoctor = employees.find((doctor) => doctor.lbz === key);
    setSelectedDoctor(newDoctor);
    setDoctorId(key);
    setStepFour(true);
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const navigateFurther = () => {
    navigate("/nurse/infirmary/patients-department");
  };

  const demoHospitalRoom = [
    {
      id: 1,
      departmentId: 1234,
      roomNumber: 321,
      roomName: "Soba 1",
      capacity: 20,
      occupancy: 10,
      odaberiSobu: "komentar",
    },
    {
      id: 2,
      departmentId: 4321,
      roomNumber: 12,
      roomName: "Soba 2",
      capacity: 10,
      occupancy: 5,
      odaberiSobu: "komentar",
    },
  ];

  if (stepOne) {
    stepOneTable = (
      <div>
        <form onSubmit={handleSubmitLbp2} className="form-custom familyFix">
          <br></br>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select"
              onChange={handleChangeLbp2}
              name="lbp"
              value={valueLbp2}
            >
              <option value="" disabled>
                Izaberite pacijenta
              </option>
              {patients.length > 0 ? (
                <>
                  {patients.map((patient) => {
                    return (
                      <option key={patient.lbp} value={patient.lbp}>
                        {patient.ime}
                      </option>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </select>
          </div>
        </form>
        {referralTableContent.length > 0 ? (
          // <Table
          //   headers={getTableHeaders("unrealizedReferrals")}
          //   tableContent={demoUnrealizedReferrals}
          //   handleChooseReferral={handleChooseReferral}
          //   handleRowClick={handleRowClick}
          // />
          <Table
            headers={getTableHeaders("referralsStationary")}
            tableContent={referralTableContent}
            handleRowClick={handleRowClick}
            tableType="referralsStationary"
            handleChooseReferral={handleChooseReferral}
          />
        ) : (
          <p className="form-section-heading">
            Trenutno ne postoji nijedan uput za datog pacijenta, ili pacijent
            nije odabran.
          </p>
        )}
      </div>
    );
  } else {
    stepOneTable = (
      <div>
        <button
          className="buttonBlue"
          onClick={undoStepOne}
          style={{
            margin: "20px",
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Resetuj formu
        </button>
        <p style={{ marginLeft: "15px" }}>
          Izabrali ste <b>uput</b>: ID uputa: {referralId}, Uputna dijagnoza:{" "}
          {referralDiagnosis}.
        </p>
        <hr></hr>
      </div>
    );
  }

  if (!stepOne && stepTwo) {
    stepTwoTable = (
      <div>
        <Table
          headers={getTableHeaders("hospitalRoom")}
          tableContent={demoHospitalRoom}
          /*              tableContent={rooms}
           */
          handleChooseRoom={handleChooseRoom}
          handleRowClick={handleRowClick}
        />
      </div>
    );
  } else if (!stepOne && !stepTwo) {
    stepTwoTable = (
      <div>
        <p style={{ marginLeft: "15px" }}>
          Izabrali ste bolnicku sobu, ID sobe: {hospitalRoomId}.
        </p>
        <hr></hr>
      </div>
    );
  }

  if (!stepOne && !stepTwo && stepThree) {
    stepThreeDropdown = (
      <div>
        <Dropdown className="dropdown">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dr. {selectedDoctor.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {employees.map((doctor) => {
              if (doctor.lbz !== selectedDoctor.lbz)
                return (
                  <Dropdown.Item
                    key={doctor.lbz}
                    onClick={() => handleChooseDoctor(doctor.lbz)}
                  >
                    Dr. {doctor.name}
                  </Dropdown.Item>
                );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );

    /*   if (!stepOne && !stepTwo && stepThree) {*/
  } else if (!stepOne && !stepTwo && !stepThree) {
    stepThreeDropdown = (
      <div>
        <p style={{ marginLeft: "15px" }}>Izabrali ste doktora: {doctorId}.</p>
        <hr></hr>
      </div>
    );
  }

  /*   if (true) { */
  if (!stepOne && !stepTwo && !stepThree && stepFour) {
    stepFourInput = (
      <div className="form-custom familyFix form-group-custom">
        <input
          className="margin-right"
          placeholder="Napomena"
          onChange={handleChangeNote}
          name="note"
          type="text"
          value={note}
        />
        <button
          disabled={doctorId === ""}
          onClick={handleSubmitAdmission}
          type="button"
        >
          Prijem pacijenta
        </button>
      </div>
    );
  }

  if (isClicked1) {
    tab = (
      <div>
        <form className="form-custom familyFix">
          <br></br>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select"
              onChange={handleChangeLbp1}
              name="lbp"
              value={valueLbp1}
              defaultValue=""
            >
              <option value="" disabled>
                Izaberite pacijenta
              </option>
              {patients.length > 0 ? (
                <>
                  {patients.map((patient) => {
                    return (
                      <option key={patient.lbp} value={patient.lbp}>
                        {patient.ime}
                      </option>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </select>
          </div>
        </form>
        <Table
          headers={getTableHeaders("admissions")}
          tableContent={tableContent}
          tableType="admissionsFinish"
          handleButtonCanceled={handleButtonCanceled}
          handleAcceptAdmission={handleAcceptAdmission}
        />
        {/* <Table
          headers={getTableHeaders("patientsAdmissions")}
          tableContent={demoPatientsAdmissions}
          handleRowClick={handleRowClick}
          handleAcceptAdmission={handleAcceptAdmission}
          handleCancelAdmission={handleCancelAdmission}
        /> */}
      </div>
    );
  } else {
    tab = [stepOneTable, stepTwoTable, stepThreeDropdown, stepFourInput];
  }

  return (
    <div style={{ marginLeft: "20%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("nurse", 6)} />
      </div>
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom dodavanja."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno primljen pacijent."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={navigateFurther}
      />
      <ul className="nav nav-tabs nav-justified">
        <li className="nav-item">
          <button
            className={` ${isClicked1 ? "isActive" : "inactive"}`}
            onClick={toggleClass1}
          >
            Zakazani pacijenti
          </button>
        </li>
        <li className="nav-item">
          <button
            className={` ${isClicked2 ? "isActive" : "inactive"}`}
            onClick={toggleClass2}
          >
            Prijem
          </button>
        </li>
      </ul>
      {tab}
    </div>
  );
};

export default NurseInfirmaryPatientAdmission;
