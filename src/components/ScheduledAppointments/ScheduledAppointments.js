import React from "react";
import SingleAppointment from "../SingleAppointment/SingleAppointment";
import "./styles.css";

const ScheduledAppointments = ({ appointments }) => {
  return (
    <div>
      {appointments.length > 0 ? (
        <div className="title">Današnji pacijenti</div>
      ) : (
        <p style={{ marginLeft: "20px" }}>
          Trenutno ne postoji nijedan zakazani pregled.
        </p>
      )}
      {appointments.map((appointment) => {
        return (
          <SingleAppointment
            appointment={appointment}
            key={appointment.zakazaniPregledId}
          />
        );
      })}
    </div>
  );
};

export default ScheduledAppointments;
