import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import GeneralStats from "../../../components/GeneralStats/GeneralStats";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../redux/actions/appointments";
import { getPatients } from "../../../redux/actions/patients";
import ScheduledAppointments from "../../../components/ScheduledAppointments/ScheduledAppointments";
import { FaUserInjured } from "react-icons/fa";
import { GiMedicalDrip, GiMedicalPack } from "react-icons/gi";
import { resetUser } from "../../../redux/actions/auth";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";

const DoctorHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointments = useSelector((state) => state.appointments);
  const patients = useSelector((state) => state.patients);
  const [appointmentNumber, setAppointmentNubmer] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const doctor = JSON.parse(localStorage.getItem("loggedUser"));
      dispatch(resetUser());
      dispatch(getAppointments(doctor.LBZ));
      dispatch(getPatients());
    } else navigate("/login");
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      const scheduledAppointments = appointments.filter((appointment) =>
        appointment.statusPregleda === "ZAKAZANO" ? appointment : false
      );
      setAppointmentNubmer(scheduledAppointments.length);
    } else setAppointmentNubmer(0);
  }, [appointments]);

  const headerProps = {
    avatarUrl: "nikolaSlika 1.jpg",
    welcomeMsg: "Dobro jutro",
    userName: "Dr. Paun",
    userTitle: "Kardiolog",
  };

  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("doctor", 1)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <Header
          avatarUrl={headerProps.avatarUrl}
          welcomeMsg={headerProps.welcomeMsg}
          userName={headerProps.userName}
          userTitle={headerProps.userTitle}
          day={format(new Date(), "d")}
          date={format(new Date(), "d MMMM, yyyy")}
        />

        <div className="components">
          <GeneralStats
            image={<GiMedicalPack size="45px" />}
            text="Zakazani pregledi"
            number={appointmentNumber}
          />
          <GeneralStats
            image={<FaUserInjured size="45px" />}
            text="Broj pacijenata"
            number={patients.length}
          />
        </div>
        {appointments.length > 0 ? (
          <ScheduledAppointments
            appointments={appointments.filter(
              (appointment) => appointment.statusPregleda === "ZAKAZANO"
            )}
          />
        ) : (
          <p className="form-section-heading">
            Trenutno nema zakazanih pregleda.
          </p>
        )}
      </div>
    </>
  );
};

export default DoctorHomepage;
