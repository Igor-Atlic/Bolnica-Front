import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPatientHistory } from "../../api";
import { createPatientState } from "../../redux/actions/patientsStates";
import CustomModal from "../CustomModal/CustomModal";

const Registration = (props) => {
  const { lbp, toggleClass1 } = props;

  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);

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
      datumVreme: formatted,
    });

    console.log({ ...form });
  };

  function handleRegistration(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    dispatch(
      createPatientState(
        {
          ...form,
          lbpPacijenta: lbp,
          lbzRegistratora: user.LBZ,
        },
        toggleModalSuccess,
        toggleModalError
      )
    );
  }
  return (
    <div>
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom registrovanja."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno registrovano stanje."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={toggleClass1}
      />
      <br></br>
      <br></br>
      <br></br>
      <form className="form-custom familyFix visits">
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-left"
            name="temperatura"
            placeholder="Temperatura"
            onChange={handleChange}
          />
          <input
            type="text"
            className="margin-left"
            name="krvniPritisak"
            placeholder="Krvni pritisak"
            onChange={handleChange}
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-left"
            name="puls"
            placeholder="Puls"
            onChange={handleChange}
          />
          <input
            type="text"
            className="margin-left"
            name="primenjeneTerapije"
            placeholder="Primenjene terapije"
            onChange={handleChange}
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-left"
            name="opis"
            placeholder="Opis stanja pacijenta"
            onChange={handleChange}
          />
          <input
            type="date"
            data-date=""
            data-date-format="ddmmyyyy"
            name="datumVreme"
            onChange={onChangeDateHandler}
            className="margin-left"
            required
          />
        </div>
        <div className="form-group-custom">
          <br></br>
          <br></br>
          <br></br>
          <button onClick={handleRegistration}>Registruj stanje</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
