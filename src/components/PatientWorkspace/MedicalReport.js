import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMedicalReport } from "../../redux/actions/medicalReports";
import CustomModal from "../CustomModal/CustomModal";
import CustomModalAnswer from "../CustomModalAnswer/CustomModalAnswer";

const MedicalReport = ({ lbp }) => {
  const [form, setForm] = useState({ lbp });
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleModalConfirm = (e) => {
    if (e) e.preventDefault();
    setModalConfirm(!modalConfirm);
  };
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);

  const confirmReport = (e) => {
    if (e) e.preventDefault();
    dispatch(
      createMedicalReport(
        { ...form, lbp },
        toggleModalSuccess,
        toggleModalError
      )
    );
  };

  return (
    <form action="#" className="examForm">
      <CustomModalAnswer
        title="Potvrda akcije"
        content="Da li želite da kreirate izveštaj?"
        toggleModal={toggleModalConfirm}
        isOpen={modalConfirm}
        handleClick={confirmReport}
      />
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom kreiranja."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno kreiran izveštaj"
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
      />
      <p className="form-section-heading">Kreiranje zdravstvenog izveštaja</p>
      <div className="form-group-custom">
        <div className="form-label-custom">Objektivni nalaz:</div>
        <textarea type="text" name="objektivniNalaz" onChange={handleChange} />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Dijagnoza:</div>
        <select
          onChange={handleChange}
          className="form-select-custom "
          aria-label="Default select example"
          defaultValue="A15.3"
          name="dijagnoza"
        >
          <option value="A15.3">A15.3 - Tuberkuloza pluća</option>
          <option value="D50">D50 - Nedostatkom gvožđa</option>
          <option value="I10">I10 - Povišen krvni pritisak</option>
          <option value="I35.0">I35.0 - Suženje aortnog zaliska</option>
          <option value="J11">J11 - Grip, virus nedokazan</option>
          <option value="J12.9">J12.9 - Zapaljenje pluća</option>
          <option value="K35">K35 - Akutno zapaljenje slepog creva</option>
          <option value="K70.3">
            K70.3 - Ciroza jetre uzrokovana alkoholom
          </option>
          <option value="K71.0">
            K71.0 - Toksička bolest jetre zbog zastoja žuči
          </option>
          <option value="N20.0">N20.0 - Kamen u bubregu</option>
        </select>
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Predlaganje terapije:</div>
        <textarea
          type="text"
          name="predlozenaTerapija"
          onChange={handleChange}
        />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Savet:</div>
        <textarea type="text" name="savet" onChange={handleChange} />
      </div>

      <button className="examSubmit" onClick={toggleModalConfirm}>
        Sacuvaj
      </button>
    </form>
  );
};

export default MedicalReport;
