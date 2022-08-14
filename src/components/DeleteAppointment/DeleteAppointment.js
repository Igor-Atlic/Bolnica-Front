import React, { useState } from "react";
import "./styles.css";

const DeleteAppointment = (props) => {
  const { avatarUrl, userName, userTitle, date, deleteAppointment } = props;

  const dateString = date.toLocaleString();

  return (
    <div className="delete-appointment-container">
      <div className="delete-appointment-header">
        <p className="header-paragraph familyFix">Brisanje pregleda</p>
        <hr className="break-line" />
        <div className="delete-appointment-doctor">
          <div className="doctor-container">
            <div className="name-container">
              <p className="user-name familyFix">{userName}</p>
              <p className="user-title familyFix">{userTitle}</p>
            </div>
          </div>
          <div className="btn-container">
            <button className="comment-btn familyFix">Dodaj komentar</button>
          </div>
        </div>
      </div>
      <div className="delete-appointment-body familyFix">
        <div className="dropdown1">
          <p className="reason-p">Razlog pregleda</p>
          <p>Kontrola</p>
        </div>
        <div className="dropdown2">
          <p className="patient-p">Pacijent</p>
          <p>Pacijent 1</p>
        </div>
        <div className="dropdown3">
          <p className="date-p">Datum pregleda</p>
          <p>{dateString}</p>
        </div>
      </div>
      <div className="delete-appointment-buttons">
        <button className="delete-btn" onClick={() => deleteAppointment()}>
          Obriši pregled
        </button>
      </div>
    </div>
  );
};

export default DeleteAppointment;
