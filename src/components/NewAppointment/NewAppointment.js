import React, { useState } from "react";
import { FormSelect } from "react-bootstrap";
import "./styles.css";

const NewAppointment = (props) => {
  const {
    avatarUrl,
    userName,
    userTitle,
    doctorId,
    createNewAppointment,
    date,
    setNewAppointmentVisible,
    patients,
  } = props;

  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [examinationType, setVal] = useState("");
  const [patientId, setPatientId] = useState("");

  const handleChange = (e) => setComment(e.target.value);

  const dateString = date.toLocaleString();
  return (
    <div
      className="new-appointment-container"
      style={{ borderLeft: "1px solid #9e9fa1" }}
    >
      <div className="new-appointment-header">
        <p className="header-paragraph familyFix">Dodaj novi pregled</p>
        <hr className="break-line" />
        <div className="new-appointment-doctor">
          <div className="doctor-container">
            {/* <div className="avatar-container">
              <img className="user-avatar" src={avatarUrl} alt={userName} />
            </div> */}
            <div className="name-container ">
              <p className="user-name familyFix">{userName}</p>
              <p className="user-title familyFix">{userTitle}</p>
            </div>
          </div>
          <div className="btn-container">
            <button
              onClick={() => setIsComment(!isComment)}
              className="comment-btn familyFix"
            >
              {!isComment ? "Dodaj komentar" : "Ukloni komentar"}
            </button>
          </div>
        </div>
      </div>
      {isComment && (
        <textarea
          style={{ width: "60%" }}
          placeholder="Komentar"
          onChange={handleChange}
          name="note"
          type="text"
        />
      )}
      <div className="new-appointment-body familyFix">
        <div className="dropdown1">
          <p className="reason-p familyFix">Razlog pregleda</p>
          <FormSelect
            aria-label="select type of medical examination"
            onChange={(e) => setVal(e.target.value)}
          >
            <option>Izaberi</option>
            <option value="pregled">Pregled</option>
            <option value="kontrola">Kontrola</option>
            <option value="operacija">Operacija</option>
            <option value="vizita">Vizita</option>
          </FormSelect>
        </div>
        <div className="dropdown2">
          <p className="patient-p familyFix">Pacijent</p>
          <FormSelect
            aria-label="select patient"
            onChange={(e) => {
              setPatientId(e.target.value);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Izaberi
            </option>
            {patients.map((patient) => {
              return (
                <option key={patient.lbp} value={patient.lbp}>
                  {patient.ime} {patient.prezime}
                </option>
              );
            })}
          </FormSelect>
        </div>
        <div className="dropdown3">
          <p className="date-p familyFix">Datum pregleda</p>
          <p>{dateString}</p>
        </div>
      </div>
      <div className="new-appointment-buttons">
        <button
          className="my-close-btn"
          onClick={() => setNewAppointmentVisible(false)}
        >
          Zatvori
        </button>
        <button
          className="my-save-btn"
          onClick={() =>
            createNewAppointment(patientId, date, examinationType, comment)
          }
        >
          Sačuvaj
        </button>
      </div>
    </div>
  );
};

export default NewAppointment;
