import React, { useEffect } from "react";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getPatients, searchPatients } from "../../../redux/actions/patients";
import { useNavigate } from "react-router";
import { getTableHeaders } from "../../../commons/tableHeaders";
import Table from "../../../components/Table/Table";
import { searchPatientsAdmissions } from "../../../redux/actions/patientsAdmissions";

const NurseInfirmaryPatientsOfTheDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [isSearch, setSearch] = useState(false);
  const patients = useSelector((state) => state.patients);
  const patientsAdmissions = useSelector((state) => state.patientsAdmissions);

  useEffect(() => {
    dispatch(getPatients());
    dispatch(searchPatientsAdmissions({}));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(searchPatientsAdmissions({ ...form, pbo: 1 }));
    setSearch(!isSearch);
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNavigate = (lbp) => {
    navigate(`/nurse/infirmary/patients-department/history/${lbp}`);
  };

  let table;
  if (patientsAdmissions && patientsAdmissions.length > 0) {
    table = (
      <Table
        headers={getTableHeaders("patientAdmissions")}
        handleRowClick={handleNavigate}
        tableContent={patientsAdmissions}
      />
    );
  }
  return (
    <div>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("nurse", 7)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <form onSubmit={handleSubmit} className="form-custom familyFix">
          <h1 className="form-heading">Rad sa pacijentima</h1>
          <br></br>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select margin-right"
              onChange={handleChange}
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
              type="text"
              className="margin-left"
              placeholder="Ime"
              onChange={handleChange}
              name="ime"
            />
          </div>
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              placeholder="Prezime"
              onChange={handleChange}
              name="Prezime"
            />
            <input
              type="text"
              className="margin-left"
              placeholder="JMBG"
              onChange={handleChange}
              name="jmbg"
            />
          </div>
          <br></br>
          <button type="submit" onClick={handleSubmit}>
            Pretraži
          </button>
        </form>
        {table}
      </div>
    </div>
  );
};

export default NurseInfirmaryPatientsOfTheDepartment;
