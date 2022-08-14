import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { format } from "date-fns";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  getEmployees,
  searchEmployees,
} from "../../../redux/actions/employee";
import "./styles.css";
import { getDepartments } from "../../../redux/actions/departments";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { getTableHeaders } from "../../../commons/tableHeaders";
import CustomModal from "../../../components/CustomModal/CustomModal";
import { getHospitals } from "../../../redux/actions/hospitals";
import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";

const EmployeePreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkbox = useCheckboxState();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [form, setForm] = useState({});
  const employees = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments);
  const hospitals = useSelector((state) => state.hospitals);
  const [deleteLbz, setDeleteLbz] = useState();

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getDepartments());
    dispatch(getHospitals());
  }, []);

  const headerProps = {
    avatarUrl: "../nikolaSlika 1.jpg",
    welcomeMsg: "Dobro jutro",
    userName: "Dr. Paun",
    userTitle: "Kardiolog",
    day: format(new Date(), "d"),
    date: format(new Date(), "d MMMM, yyyy"),
  };

  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalDelete = (lbz) => {
    setDeleteLbz(lbz);
    setModalDelete(!modalDelete);
  };

  const handleClick = () => {
    dispatch(deleteEmployee(deleteLbz, toggleModalSuccess, toggleModalError));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (lbz) => {
    navigate(`/admin/edit-employee/${lbz}`);
  };

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(searchEmployees({ ...form, obrisan: checkbox.state }));
  }

  return (
    <div>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("admin", 2)} />
      </div>

      <div style={{ marginLeft: "20%" }}>
        <CustomModalAnswer
          title="Potvrda akcije"
          content="Da li želite da obrišete zaposlenog?"
          toggleModal={toggleModalDelete}
          isOpen={modalDelete}
          handleClick={handleClick}
        />
        <CustomModal
          title="Uspeh"
          content="Uspesno obrisan zaposleni."
          toggleModal={toggleModalSuccess}
          isOpen={modalSuccess}
        />
        <CustomModal
          title="Greška"
          content="Doslo je do greške prilikom brisanja zaposlenog."
          toggleModal={toggleModalError}
          isOpen={modalError}
        />
        <Header
          avatarUrl={headerProps.avatarUrl}
          welcomeMsg={headerProps.welcomeMsg}
          userName={headerProps.userName}
          userTitle={headerProps.userTitle}
          day={headerProps.day}
          date={headerProps.date}
        />
        <div>
          <h1 className="myTitle">Zaposleni</h1>
        </div>
        <form onSubmit={handleSubmit} className="form-custom familyFix">
          <div className="form-group-custom">
            <input
              type="text"
              className="margin-right"
              placeholder="Ime"
              onChange={handleChange}
              name="name"
            />
            <input
              type="text"
              className="margin-left"
              placeholder="Prezime"
              onChange={handleChange}
              name="surname"
            />
          </div>
          <div className="form-group-custom">
            <select
              className="form-select-custom small-select margin-right"
              onChange={handleChange}
              name="department"
              value={form.department}
              defaultValue=""
            >
              <option value="" disabled>
                Izaberite odeljenje
              </option>
              <option value="-1">Sva odeljenja</option>
              {departments.length > 0 ? (
                <>
                  {departments.map((department) => {
                    return (
                      <option
                        key={department.odeljenjeId}
                        value={department.odeljenjeId}
                      >
                        {department.naziv}
                      </option>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </select>
            <select
              className="form-select-custom small-select margin-left"
              onChange={handleChange}
              name="hospital"
              value={form.hospital}
              defaultValue=""
            >
              <option value="" disabled>
                Izaberite bolnicu
              </option>
              <option value="-1">Sve bolnice</option>
              {hospitals.length > 0 ? (
                <>
                  {hospitals.map((hospital) => {
                    return (
                      <option
                        key={hospital.zdravstvenaUstanovaId}
                        value={hospital.zdravstvenaUstanovaId}
                      >
                        {hospital.naziv}
                      </option>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="form-group-custom margin-top margin-bottom">
            <Checkbox {...checkbox}>Obrisani zaposleni</Checkbox>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Pretraži
          </button>
        </form>
        {employees.length > 0 ? (
          <>
            <Table
              headers={getTableHeaders("employeePreview")}
              tableContent={employees}
              handleEdit={handleEdit}
              tableType="employees"
              handleClick={toggleModalDelete}
            />
          </>
        ) : (
          <p style={{ marginLeft: "15px", color: "black" }}>
            Nije pronadjen nijedan zaposleni.
          </p>
        )}
        <br />
      </div>
    </div>
  );
};

export default EmployeePreview;
