import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { format } from "date-fns";
import { BiSearchAlt } from "react-icons/bi";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePatient,
  getPatients,
  searchPatients,
} from "../../../redux/actions/patients";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { getTableHeaders } from "../../../commons/tableHeaders";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";
import CustomModal from "../../../components/CustomModal/CustomModal";

const RecepcionistHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const patients = useSelector((state) => state.patients);
  const filteredPatients = useSelector((state) => state.filteredPatients);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteLbp, setDeleteLbp] = useState();

  useEffect(() => {
    dispatch(getPatients());
  }, []);

  const linksHeader = {
    avatarUrl: "../nikolaSlika 1.jpg",
    welcomeMsg: "Dobro jutro",
    userName: "Ana Reljić",
    userTitle: "Med sestra",
    day: format(new Date(), "d"),
    date: format(new Date(), "d MMMM, yyyy"),
  };

  const handleClick = () => {
    dispatch(deletePatient(deleteLbp, toggleModalSuccess, toggleModalError));
  };

  const handleEdit = (lbp) => {
    navigate(`/recepcionist/edit-patient/${lbp}`);
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

  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalDelete = (lbp) => {
    setDeleteLbp(lbp);
    setModalDelete(!modalDelete);
  };
  const navigateToHomepage = () => navigate("/recepcionist");

  return (
    <div>
      <CustomModalAnswer
        title="Potvrda akcije"
        content="Da li želite da obrišete pacijenta?"
        toggleModal={toggleModalDelete}
        isOpen={modalDelete}
        handleClick={handleClick}
      />
      <CustomModal
        title="Uspeh"
        content="Uspesno izmenjen pacijent."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={navigateToHomepage}
      />
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom izmene pacijenta."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("recepcionist", 1)} />
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
            handleEdit={handleEdit}
            headers={getTableHeaders("patientPreview")}
            tableContent={filteredPatients}
            handleClick={toggleModalDelete}
            tableType="patients"
          />
        )}
        <br />
      </div>
    </div>
  );
};

export default RecepcionistHomepage;
