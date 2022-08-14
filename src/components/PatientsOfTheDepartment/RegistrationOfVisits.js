import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPatientsVisits } from "../../redux/actions/patientsVisits";
import CustomModal from "../CustomModal/CustomModal";

const RegistrationOfVisits = (props) => {
  const { lbp, toggleClass3 } = props;

  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);

  function handleRegistration(event) {
    event.preventDefault();
    dispatch(
      createPatientsVisits(
        { lbp, ...form },
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
        content="Uspešno registrovana poseta."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={toggleClass3}
      />
      <br></br>
      <br></br>
      <br></br>
      <form className="form-custom familyFix visits">
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-left"
            name="patientName"
            placeholder="Ime"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="margin-left"
            name="patientSurname"
            placeholder="Prezime"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-left"
            name="patientPID"
            placeholder="JMBG"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="margin-left"
            name="note"
            placeholder="Napomena"
            onChange={handleChange}
          />
        </div>
        <div className="form-group-custom">
          <br></br>
          <br></br>
          <br></br>
          <button onClick={handleRegistration}>Registruj posetu</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationOfVisits;
