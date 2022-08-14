import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { format } from "date-fns";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { getPatients, searchPatients } from "../../../redux/actions/patients";
import { useNavigate } from "react-router";
import { getTableHeaders } from "../../../commons/tableHeaders";
const PatientPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const patients = useSelector((state) => state.patients);
  const filteredPatients = useSelector((state) => state.filteredPatients);

  useEffect(() => {
    dispatch(getPatients());
  }, []);

  const linksHeader = {
    avatarUrl: "../nikolaSlika 1.jpg",
    welcomeMsg: "Dobro jutro",
    userName: "Dr. Paun",
    userTitle: "Kardiolog",
    day: format(new Date(), "d"),
    date: format(new Date(), "d MMMM, yyyy"),
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (form.lbp === "-1") {
      console.log(form.lbp);
      dispatch(searchPatients({ ...form, lbp: null }));
    } else dispatch(searchPatients(form));
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePatientChange = (event) => {
    setForm({ ...form, lbp: event.target.value });
  };

  const handleRowClick = (entry) => {
    navigate(`/examination/${entry[0][1]}`);
  };

  return (
    <div>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("doctor", 2)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <Header
          avatarUrl={linksHeader.avatarUrl}
          welcomeMsg={linksHeader.welcomeMsg}
          userName={linksHeader.userName}
          userTitle={linksHeader.userTitle}
          day={linksHeader.day}
          date={linksHeader.date}
        />
        <div>
          <h1 className="myTitle">Pacijenti</h1>
        </div>
        <form className="form-custom familyFix">
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              placeholder="Ime"
              onChange={handleChange}
              name="ime"
            />
            <input
              type="text"
              className="margin-left"
              placeholder="Prezime"
              onChange={handleChange}
              name="prezime"
            />
          </div>
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              placeholder="JMBG"
              onChange={handleChange}
              name="jmbg"
            />
            <select
              className="form-select-custom small-select margin-left"
              onChange={handlePatientChange}
              name="lbp"
              value={form.lbp}
              defaultValue=""
            >
              <option value="" disabled>
                Izaberite pacijenta
              </option>
              <option value="-1">Svi pacijenti</option>
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
          <button type="submit" onClick={handleSubmit}>
            Pretraži
          </button>
        </form>
        {patients.length > 0 && (
          <Table
            headers={getTableHeaders("patientPreview")}
            tableContent={filteredPatients}
            tableType="patientsPreview"
            handleRowClick={handleRowClick}
          />
        )}
        <br />
      </div>
    </div>
  );
};
export default PatientPreview;
