import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import "./styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReferrals,
  getUnprocessedReferrals,
} from "../../../redux/actions/referrals";
import { createLabReport } from "../../../redux/actions/labReports";
import {
  searchLabVisits,
  updateLabVisits,
} from "../../../redux/actions/visits";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import CustomModal from "../../../components/CustomModal/CustomModal";
import ActionConfirmationModal from "../../../components/ActionConfirmationModal/ActionConfirmationModal";
import { useEffect } from "react";
import { getPatients } from "../../../redux/actions/patients";
import { getEmployees } from "../../../redux/actions/employee";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";
import { getDepartments } from "../../../redux/actions/departments";

const initialStateForm = {
  lbp: "",
};
const initialStateFormLbp = {
  lbpForm: "",
};
const AdmissionPage = () => {
  const handleRowClick = (entry) => {};
  let tab;
  let labRep;
  let dateValue = new Date();

  const referrals = useSelector((state) => state.referrals);
  const employees = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments);
  const patients = useSelector((state) => state.patients);
  const visits = useSelector((state) => state.visits);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialStateForm);
  const [formLbp, setFormLbp] = useState(initialStateFormLbp);
  const [value, setValue] = useState("");
  const [valueLbp, setValueLbp] = useState();
  const [referralTableContent, setReferralTableContent] = useState([]);
  const [isClicked1, setClicked1] = useState(true);
  const [isClicked2, setClicked2] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalSuccess2, setModalSuccess2] = useState(false);
  const [modalError2, setModalError2] = useState(false);
  const [modalConfirm2, setModalConfirm2] = useState(false);
  const [entry, setEntry] = useState();
  const [entry2, setEntry2] = useState();
  const [visitsTableContent, setVisitsTableContent] = useState([]);

  useEffect(() => {
    dispatch(searchLabVisits({}));
    dispatch(getDepartments());
    dispatch(getPatients());
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (
      referrals.length > 0 &&
      employees.length > 0 &&
      departments.length > 0
    ) {
      setReferralTableContent(
        referrals
          .filter((referral) =>
            referral.tip === "LABORATORIJA" ? referral : false
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
      console.log(referralTableContent);
    }
  }, [referrals, employees, departments]);

  useEffect(() => {
    console.log(visits);
    setVisitsTableContent(
      visits.filter((visit) =>
        visit.statusPregleda === "ZAKAZANO" ? visit : false
      )
    );
  }, [visits]);

  const toggleClass1 = () => {
    if (!isClicked1) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
    setValueLbp("");
  };
  const toggleClass2 = () => {
    if (!isClicked2) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
  };
  const handleClick = (entry) => {
    console.log(entry);
    dispatch(createLabReport(entry[0][1]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form });
    dispatch(getReferrals({ ...form }));
  };

  const handlePatientChange = (event) => {
    setForm({ ...form, lbp: event.target.value });
    console.log(event.target.value);
    dispatch(searchLabVisits({ date: dateValue, lbp: event.target.value }));
  };
  console.log(referralTableContent);

  const handlePatientChange2 = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    dispatch(getUnprocessedReferrals(event.target.value));
  };

  const handlecreateLabReport = () => {
    console.log(entry2);
    dispatch(
      createLabReport(entry2[0][1], toggleModalSuccess, toggleModalError)
    );
    console.log(value);
    setTimeout(() => {
      dispatch(getUnprocessedReferrals(value));
    }, 100);
  };

  const handleCreateLabReportTab1 = (entry) => {
    console.log(entry);
    dispatch(updateLabVisits({ id: entry[0][1], status: "ZAVRSENO" }));
    setClicked2(true);
    setClicked1(false);
    setDisable(false);
    setValue(entry[2][1]);
  };

  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalConfirm = (entry) => {
    setModalConfirm(!modalConfirm);
    if (entry) setEntry2(entry);
  };
  const toggleModalSuccess2 = () => setModalSuccess2(!modalSuccess2);
  const toggleModalError2 = () => setModalError2(!modalError2);
  const toggleModalConfirm2 = (entry) => {
    setModalConfirm2(!modalConfirm2);
    if (entry) setEntry(entry);
  };

  function handleButtonCanceled() {
    dispatch(
      updateLabVisits(
        { id: entry[0][1], status: "OTKAZANO" },
        toggleModalSuccess2,
        toggleModalError2
      )
    );
  }
  if (isClicked1) {
    tab = (
      <div>
        <form className="form-custom familyFix">
          <br></br>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select margin-right"
              onChange={handlePatientChange}
              name="lbp"
              value={form.lbp}
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
        {visitsTableContent.length > 0 ? (
          <Table
            headers={getTableHeaders("scheduledVisits")}
            tableContent={visitsTableContent}
            tableType="admissionVisits"
            handleRowClick={handleRowClick}
            handleButtonCanceled={toggleModalConfirm2}
            handleCreateLabReportTab1={handleCreateLabReportTab1}
          />
        ) : (
          <p className="form-section-heading">
            Trenutno nema zakazanih pregleda.
          </p>
        )}
      </div>
    );
  } else {
    tab = (
      <div>
        <form onSubmit={handleSubmit} className="form-custom familyFix">
          <br></br>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select margin-right"
              onChange={handlePatientChange2}
              name="lbp"
              value={value}
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
        {referralTableContent.length > 0 ? (
          <Table
            headers={getTableHeaders("unrealizedLabReferrals")}
            tableContent={referralTableContent}
            handlecreateLabReport={toggleModalConfirm}
            handleRowClick={handleRowClick}
            tableType="unrealizedLabReferrals"
            handleClick={toggleModalConfirm}
          />
        ) : value !== "" ? (
          <p className="form-section-heading">
            Trenutno ne postoji nijedan laboratorijski uput za datog pacijenta
          </p>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return (
    <div>
      <Sidebar links={getSidebarLinks("technician", 2)} />
      <div style={{ marginLeft: "20%" }}>
        <CustomModalAnswer
          title="Potvrda akcije"
          content="Da li želite da zakažete posetu?"
          toggleModal={toggleModalConfirm}
          isOpen={modalConfirm}
          handleClick={handlecreateLabReport}
        />
        <CustomModal
          title="Uspeh"
          content="Uspesno zakazana poseta."
          toggleModal={toggleModalSuccess}
          isOpen={modalSuccess}
          handleClick={() => {
            setClicked1(false);
            setClicked2(true);
            dispatch(searchLabVisits());
          }}
        />
        <CustomModal
          title="Greška"
          content="Doslo je do greške prilikom zakazivanja posete."
          toggleModal={toggleModalError}
          isOpen={modalError}
        />
        <CustomModalAnswer
          title="Potvrda akcije"
          content="Da li želite da otkažete posetu?"
          toggleModal={toggleModalConfirm2}
          isOpen={modalConfirm2}
          handleClick={handleButtonCanceled}
        />
        <CustomModal
          title="Uspeh"
          content="Uspesno otkazana poseta."
          toggleModal={toggleModalSuccess2}
          isOpen={modalSuccess2}
        />
        <CustomModal
          title="Greška"
          content="Doslo je do greške prilikom otkazivanja posete."
          toggleModal={toggleModalError2}
          isOpen={modalError2}
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
              Kreiranje radnog naloga
            </button>
          </li>
        </ul>
        {tab}
      </div>
    </div>
  );
};

export default AdmissionPage;
