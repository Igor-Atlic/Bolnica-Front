import React, { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import "./styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import { getNumberofAppointments } from "../../../redux/actions/numberOfAppointments";
import {
  searchLabVisits,
  updateLabVisits,
} from "../../../redux/actions/visits";
import { createVisit } from "../../../redux/actions/visits";
import { BiSearchAlt } from "react-icons/bi";
import { getLabReports } from "../../../redux/actions/labReports";
import { getPatients } from "../../../redux/actions/patients";
import { set } from "date-fns";
import { getUnprocessedReferrals } from "../../../redux/actions/referrals";
import { getDepartments } from "../../../redux/actions/departments";
import { getEmployees } from "../../../redux/actions/employee";
import { getVisitCount } from "../../../api";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";
import CustomModal from "../../../components/CustomModal/CustomModal";

const VisitsPage = () => {
  const [isClicked1, setClicked1] = useState(true);
  const [isClicked2, setClicked2] = useState(false);
  const [form, setForm] = useState({ date: new Date() });
  const [form2, setForm2] = useState({});
  const dispatch = useDispatch();
  const [isSearch, setSearch] = useState(false);
  const [visitCount, setVisitCount] = useState("Broj zakazanih pacijenata");
  const patients = useSelector((state) => state.patients);
  const number = useSelector((state) => state.number);
  const departments = useSelector((state) => state.departments);
  const referrals = useSelector((state) => state.referrals);
  const employees = useSelector((state) => state.employees);
  const visits = useSelector((state) => state.visits);
  const [referralTableContent, setReferralTableContent] = useState([]);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalSuccess2, setModalSuccess2] = useState(false);
  const [modalError2, setModalError2] = useState(false);
  const [modalConfirm2, setModalConfirm2] = useState(false);
  const [entry, setEntry] = useState();

  useEffect(() => {
    // dispatch(getLabReports());
    dispatch(getPatients());
    dispatch(getDepartments());
    dispatch(getEmployees());
    dispatch(searchLabVisits({}));
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
    dispatch(searchLabVisits(form2));
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
      date: formatted,
    });
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
  };

  const handlePatientChange = (event) => {
    setForm({ ...form, lbp: event.target.value });
    dispatch(getUnprocessedReferrals(event.target.value));
  };

  const handlePatientChange2 = (event) => {
    setForm2({ ...form2, lbp: event.target.value });
    // dispatch(getUnprocessedReferrals(event.target.value));
  };

  function handleScheduling() {
    console.log(form);
    dispatch(createVisit(form, toggleModalSuccess, toggleModalError));
  }

  let status;
  function handleButtonCanceled() {
    dispatch(
      updateLabVisits(
        { id: entry[0][1], status: "OTKAZANO" },
        toggleModalSuccess2,
        toggleModalError2
      )
    );
  }

  function handleButtonFinished(entry) {
    status = "ZAVRSENO";
    dispatch(updateLabVisits({ id: entry[0][1], status }));
  }

  async function handleNumberFetch() {
    const number = await getVisitCount({ dateAndTime: form.date });
    console.log(number);
    setVisitCount(number.data);
  }
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalConfirm = () => setModalConfirm(!modalConfirm);
  const toggleModalSuccess2 = () => setModalSuccess2(!modalSuccess2);
  const toggleModalError2 = () => setModalError2(!modalError2);
  const toggleModalConfirm2 = (entry) => {
    setModalConfirm2(!modalConfirm2);
    if (entry) setEntry(entry);
  };

  let table =
    referrals.length !== 0 ? (
      <Table
        headers={getTableHeaders("unrealizedLabReferrals")}
        tableContent={referralTableContent}
      />
    ) : form.lbp !== undefined ? (
      <p className="form-section-heading">
        Trenutno ne postoji nijedan uput vezan za traženog pacijenta
      </p>
    ) : (
      <p className="form-section-heading">Pretraga uputa</p>
    );

  let table2;
  console.log(visits);
  if (visits.length > 0) {
    table2 = (
      <Table
        headers={getTableHeaders("scheduledVisits")}
        tableContent={visits}
        tableType="searchVisits"
        handleButtonCanceled={toggleModalConfirm2}
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
              name="date"
              onChange={onChangeDateHandler}
              className="margin-right margin-left"
            />
            <input
              type="text"
              placeholder="Broj zakazanih pacijenata"
              name="number"
              className="margin-left"
              value={visitCount}
              disabled="disabled"
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
          <div className="form-group-custom">
            <button
              className="buttonForm margin-right"
              type="button"
              onClick={handleNumberFetch}
            >
              Broj poseta
            </button>
            <button
              className="buttonForm margin-left"
              type="button"
              onClick={toggleModalConfirm}
            >
              Zakaži
            </button>
          </div>
        </form>
        {table}
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
        <Sidebar links={getSidebarLinks("technician", 3)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <CustomModalAnswer
          title="Potvrda akcije"
          content="Da li želite da zakažete posetu?"
          toggleModal={toggleModalConfirm}
          isOpen={modalConfirm}
          handleClick={handleScheduling}
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
              Pregled zakazanih poseta
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
