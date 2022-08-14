import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientsHistory } from "../../api";
import { getTableHeaders } from "../../commons/tableHeaders";
import { getPatientStates } from "../../redux/actions/patientsStates";
import Table from "../Table/Table";
const History = (props) => {
  const { lbp, toggleClass2 } = props;

  const [form, setForm] = useState({ startdate: "" });
  const [form2, setForm2] = useState();
  const [patHistory, setPatHistory] = useState();
  const dispatch = useDispatch();
  const patientStates = useSelector((state) => state.patientStates);

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
      startdate: formatted,
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
      dob: formatted,
    });

    console.log({ ...form2 });
  };

  function handleGet(event) {
    event.preventDefault();
    // if (form.length > 0 && form2.length > 0)
    dispatch(getPatientStates({ ...form, ...form2, lbp }));
  }

  let table;
  let button;

  if (patientStates && patientStates.length > 0) {
    table = (
      <Table
        headers={getTableHeaders("patientStates")}
        tableContent={patientStates}
      />
    );
    button = (
      <button className="butReg" onClick={toggleClass2}>
        Registruj novo stanje
      </button>
    );
  } else
    table = (
      <p className="form-section-heading">
        Trenutno ne postoji istorija stanja
      </p>
    );

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <form className="form-custom familyFix visits">
        <div className="form-group-custom">
          <label>Od: </label>
          <input
            type="date"
            data-date=""
            data-date-format="ddmmyyyy"
            name="startdate"
            onChange={onChangeDateHandler}
            min={new Date().toISOString().split("T")[0]}
            className="margin-right"
          />
          <label>Do: </label>
          <input
            type="date"
            data-date=""
            data-date-format="ddmmyyyy"
            name="dob"
            min={
              form.startdate
                ? new Date(form.startdate).toISOString().split("T")[0]
                : ""
            }
            onChange={onChangeDateHandler2}
            className="margin-right"
          />

          <button type="button" onClick={handleGet}>
            Pretraži
          </button>
        </div>
      </form>

      {button}
      {table}
    </div>
  );
};

export default History;
