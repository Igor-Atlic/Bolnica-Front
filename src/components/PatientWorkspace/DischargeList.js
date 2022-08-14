import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDischargeList } from "../../redux/actions/dischargeLists";
import CustomModal from "../CustomModal/CustomModal";
import CustomModalAnswer from "../CustomModalAnswer/CustomModalAnswer";

const DischargeList = ({ lbp }) => {
  const [form, setForm] = useState({ lbp, pbo: 1 });
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

  const createList = (e) => {
    if (e) e.preventDefault();
    dispatch(createDischargeList(form));
  };

  return (
    <form action="#" className="examForm">
      <CustomModalAnswer
        title="Potvrda akcije"
        content="Da li želite da završite pregled?"
        toggleModal={toggleModalConfirm}
        isOpen={modalConfirm}
        handleClick={createList}
      />
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom dodavanja."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno dodato"
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
      />
      <p className="form-section-heading">Kreiranje otpusne liste</p>
      <div className="form-group-custom">
        <div className="form-label-custom">Prateće dijagnoze:</div>
        <textarea type="text" name="prateceDijagnoze" onChange={handleChange} />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Anamneza:</div>
        <textarea type="text" name="anamneza" onChange={handleChange} />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Analize:</div>
        <textarea type="text" name="analize" onChange={handleChange} />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Tok bolesti:</div>
        <textarea type="text" name="tokBolesti" onChange={handleChange} />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Zaključak</div>
        <textarea type="text" name="zakljucak" onChange={handleChange} />
      </div>
      <div className="form-group-custom">
        <div className="form-label-custom">Terapija:</div>
        <textarea type="text" name="terapija" onChange={handleChange} />
      </div>

      <button className="examSubmit" onClick={toggleModalConfirm}>
        Sacuvaj
      </button>
    </form>
  );
};

export default DischargeList;
