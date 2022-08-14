import React, { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import "./styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import { BiSearchAlt } from "react-icons/bi";
import { getPatients } from "../../../redux/actions/patients";
import { getUnprocessedReferrals } from "../../../redux/actions/referrals";
import {
  createAdmission,
  getAdmissions,
  updateAdmission,
} from "../../../redux/actions/admissions";
import { getDepartments } from "../../../redux/actions/departments";
import CustomModal from "../../../components/CustomModal/CustomModal";

const VisitsPage = () => {
  const [isClicked1, setClicked1] = useState(true);
  const [isClicked2, setClicked2] = useState(false);
  const [isReport, setReport] = useState(false);
  const [form, setForm] = useState({});
  const [form2, setForm2] = useState({});
  const dispatch = useDispatch();
  const [isModal, setModal] = useState();
  const [isSearch, setSearch] = useState(false);
  const [value, setValue] = useState("");
  const patients = useSelector((state) => state.patients);
  const admissions = useSelector((state) => state.admissions);
  const departments = useSelector((state) => state.departments);
  const visits = useSelector((state) => state.visits);
  const [tableContent, setTableContent] = useState([]);
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDepartments());
    dispatch(getAdmissions({}));
  }, []);

  useEffect(() => {
    if (patients.length > 0 && admissions.length > 0) {
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
  }, [patients, admissions]);

  const toggleClass1 = () => {
    if (!isClicked1) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
  };

  const toggleClass2 = () => {
    if (!isClicked2) {
      setClicked2(!isClicked2);
      setClicked1(!isClicked1);
    }
  };

  const toggleSeach = () => {
    console.log(form2);
    dispatch(getAdmissions(form2));
    if (isClicked2) setSearch(!isSearch);
  };

  const handleChangeArea = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let formatted;
  const onChangeDateHandler = (e) => {
    const date = new Date(e.target.value);
    const years = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    formatted = years;
    formatted += month.length === 1 ? `-0${month}` : `-${month}`;
    formatted += day.length === 1 ? `-0${day}` : `-${day}`;
    setForm({
      ...form,
      datumVremePrijema: formatted,
    });

    console.log({ ...form });
  };

  const onChangeDateHandler2 = (e) => {
    const date = new Date(e.target.value);
    const years = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    formatted = years;
    formatted += month.length === 1 ? `-0${month}` : `-${month}`;
    formatted += day.length === 1 ? `-0${day}` : `-${day}`;
    setForm2({
      ...form2,
      date: formatted,
    });

    console.log({ ...form2 });
  };

  const handlePatientChange = (event) => {
    setForm({ ...form, lbp: event.target.value });
    dispatch(getUnprocessedReferrals(event.target.value));
  };

  const handlePatientChange2 = (event) => {
    setForm2({ ...form2, lbp: event.target.value });
    // dispatch(getUnprocessedReferrals(event.target.value));
  };

  function handleScheduling(event) {
    if (event) event.preventDefault();
    console.log({ ...form });
    dispatch(createAdmission(form, toggleModalSuccess, toggleModalError));
  }

  function handleButtonCanceled(entry) {
    console.log(entry);
    dispatch(
      updateAdmission({ id: entry[0][1], status: "OTKAZAN" }, toggleModalCancel)
    );
  }

  function handleButtonFinished(entry) {
    console.log(entry);
    dispatch(updateAdmission({ id: entry[0][1], status: "REALIZOVAN" }));
  }
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalCancel = () => setModalCancel(!modalCancel);

  let table2;
  if (admissions.length > 0) {
    table2 = (
      <Table
        headers={getTableHeaders("admissions")}
        tableContent={tableContent}
        tableType="admissions"
        handleButtonCanceled={handleButtonCanceled}
        handleButtonFinished={handleButtonFinished}
      />
    );
  } else {
    table2 = <div></div>;
  }

  let forma;
  if (isClicked1) {
    forma = (
      <div>
        <form action="#" className="form-custom familyFix visits">
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
            <input
              type="date"
              data-date=""
              data-date-format="ddmmyyyy"
              name="datumVremePrijema"
              onChange={onChangeDateHandler}
              className="margin-left"
            />
          </div>
          <div className="form-group-custom">
            <textarea
              name="napomena"
              cols="50"
              onChange={handleChangeArea}
              placeholder="Napomena..."
            ></textarea>
          </div>
          <br></br>
          <br></br>
          <div className="form-group-custom">
            <button
              className="buttonForm"
              type="button"
              onClick={handleScheduling}
            >
              Zakaži
            </button>
          </div>
        </form>
      </div>
    );
  }

  let forma2;
  if (isClicked2) {
    forma2 = (
      <div>
        <form className="form-custom familyFix visits">
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select margin-right"
              onChange={handlePatientChange2}
              name="lbp"
              value={form2.lbp}
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
            <div className="form-group-custom">
              <input
                type="date"
                data-date=""
                data-date-format="ddmmyyyy"
                name="date"
                onChange={onChangeDateHandler2}
                className="margin-right"
              />
              <button
                className="buttonForm"
                type="button"
                onClick={toggleSeach}
              >
                <BiSearchAlt />
              </button>
            </div>
          </div>
        </form>
        {table2}
      </div>
    );
  }

  return (
    <div>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("nurse", 5)} />
      </div>
      <CustomModal
        title="Greška"
        content="Doslo je do greške."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno zakazan prijem"
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={toggleClass2}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno otkazan prijem"
        toggleModal={toggleModalCancel}
        isOpen={modalCancel}
      />
      <div style={{ marginLeft: "20%" }}>
        <ul className="nav nav-tabs nav-justified">
          <li className="nav-item">
            <button
              className={` ${isClicked1 ? "active" : "disabled"}`}
              onClick={toggleClass1}
            >
              Zakazivanje
            </button>
          </li>
          <li className="nav-item">
            <button
              className={` ${isClicked2 ? "active" : "disabled"}`}
              onClick={toggleClass2}
            >
              Zakazani prijemi
            </button>
          </li>
        </ul>
        {forma}
        {forma2}
        {/* <ActionConformationModal
          title="Naslov"
          info="info"
          handleClick={handleEnd}
        /> */}
      </div>
    </div>
  );
};

export default VisitsPage;
