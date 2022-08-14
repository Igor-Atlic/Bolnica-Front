import React from "react";
import "./styles.css";
import { format } from "date-fns";

const SingleAppointmentNurse = ({ appointment, updateAppointmentStatus }) => {
  const { datumIVremePregleda, lbzLekara, pacijent, zakazaniPregledId } =
    appointment;

  let age = format(new Date(), "yyyy") - format(pacijent.datumRodjenja, "yyyy");
  let appointTime = format(new Date(datumIVremePregleda), "HH:mm");
  let appointDate = format(new Date(datumIVremePregleda), "dd:MM:yyyy");

  return (
    <div className="customClass">
      <div className="d-flex flex-row align-items-center ">
        <div className="appTime">
          <span>
            {appointTime} {appointDate}
          </span>
        </div>
        <div className="customContainer">
          <div className="d-flex flex-row justify-content-around appointment">
            <span className="text-dark text1">
              {pacijent.ime} {pacijent.prezime}
            </span>
            <span className="text2">
              Starost: {age}, Pol: {pacijent.pol}
            </span>
            {/* <div className="d-flex">
              <button
                type="button"
                className="btn customButton1"
                onClick={() =>
                  updateAppointmentStatus(zakazaniPregledId, "ZAKAZANO")
                }
              >
                Čeka
              </button>
              <button type="button" className="btn customButton2">
                U toku
              </button>
              <button
                type="button"
                className="btn customButton3"
                onClick={() =>
                  updateAppointmentStatus(zakazaniPregledId, "OTKAZANO")
                }
              >
                Otkazi
              </button>
              <button type="button" className="btn customButton4">
                Završeno
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleAppointmentNurse;
