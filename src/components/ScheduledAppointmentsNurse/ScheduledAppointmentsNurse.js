import React from "react";
import SingleAppointmentNurse from "../SingleAppointmentNurse/SingleAppointmentNurse";

const ScheduledAppointmentsNurse = ({
  updateAppointmentStatus,
  appointments,
}) => {
  return (
    <div>
      <div className="title">Današnji pacijenti</div>
      {appointments.map((appointment) => {
        return (
          <SingleAppointmentNurse
            updateAppointmentStatus={updateAppointmentStatus}
            key={appointment.zakazaniPregledId}
            appointment={appointment}
          />
        );
      })}
    </div>
  );
};

export default ScheduledAppointmentsNurse;
