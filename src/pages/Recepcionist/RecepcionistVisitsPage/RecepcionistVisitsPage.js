import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import { getPatientsVisits } from "../../../redux/actions/patientsVisits";

const initialState = {
  jmbg: "",
  ime: "",
  lbp: "",
  prezime: "",
};
const patient = [
  {
    idOdeljenja: 2,
    nazivOdeljenja: "Odeljenje 2",
    idSobe: 5,
    lbp: 3,
    ime: "Nikola",
    prezime: "Nikolic",
    jmbg: 31231231,
  },
  {
    idOdeljenja: 3,
    nazivOdeljenja: "Odeljenje 3",
    idSobe: 5,
    lbp: 4,
    ime: "Jovan",
    prezime: "Jovanovic",
    jmbg: 55555555,
  },
  {
    idOdeljenja: 4,
    nazivOdeljenja: "Odeljenje 4",
    idSobe: 5,
    lbp: 1,
    ime: "Petar",
    prezime: "Petrovic",
    jmbg: 44444444,
  },
  {
    idOdeljenja: 4,
    nazivOdeljenja: "Odeljenje 4",

    idSobe: 5,
    lbp: 5,
    ime: "Luka",
    prezime: "Lukic",
    jmbg: 33333333,
  },
  {
    idOdeljenja: 12,
    nazivOdeljenja: "Odeljenje 12",
    idSobe: 6,
    lbp: 7,
    ime: "Nikola",
    prezime: "Nikolic",
    jmbg: 31231200,
  },
];

const RecepcionistVisitsPage = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientsVisits = useSelector((state) => state.patientsVisits);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (lbp) => {
    navigate(`/recepcionist/registation-visits/${lbp}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.lbp === "" &&
      form.ime === "" &&
      form.prezime === "" &&
      form.jmbg === ""
    ) {
      //console.log("Cap")
    } else {
      //console.log(form);
      dispatch(getPatientsVisits(form));
    }
  };
  return (
    <div style={{ marginLeft: "20%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("recepcionist", 5)} />
      </div>
      <form className="form-custom">
        <h1 className="form-heading">Pretraga poseta</h1>
        <br></br>
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
            placeholder="LBP"
            onChange={handleChange}
            name="lbp"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG"
            onChange={handleChange}
            name="jmbg"
          />
        </div>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Pretrazite pacijente
        </button>
      </form>
      {patient.length > 0 && (
        <Table
          headers={getTableHeaders("visitPreview")}
          //tableContent={patient}
          tableContent={patient}
          handleEdit={handleEdit}
          tableType="visits"
        />
      )}
    </div>
  );
};

export default RecepcionistVisitsPage;
