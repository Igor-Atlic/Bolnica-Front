import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  getAppointments,
} from "../../../redux/actions/appointments";
import { getPatients } from "../../../redux/actions/patients";
import { resetUser } from "../../../redux/actions/auth";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import CustomCalendar from "../../../components/CustomCalendar/CustomCalendar";
import { useNavigate } from "react-router";

const DoctorCalendarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients);
  const appointments = useSelector((state) => state.appointments);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      startAt: "2022-04-08T08:00:00.000Z",
      endAt: "2022-04-08T09:00:00.000Z",
      summary: "Prvi pregled",
      color: "#336cfb",
      calendarID: "work",
    },
  ]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const doctor = JSON.parse(localStorage.getItem("loggedUser"));
      dispatch(resetUser());
      dispatch(getAppointments(doctor.LBZ));
      dispatch(getPatients());
    } //else navigate("/login");
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      const newEvents = appointments.filter((appo) =>
        appo.statusPregleda === "ZAKAZANO" ? appo : false
      );
      setEvents(
        newEvents.map((appointment) => {
          const date = new Date(appointment.datumIVremePregleda);
          return {
            id: appointment.zakazaniPregledId,
            startAt: date.toISOString(),
            endAt: date.addHours(1).toISOString(),
            summary: `Pacijent: ${appointment.pacijent.ime} ${appointment.pacijent.prezime}`,
            color: "#336cfb",
            calendarID: "work",
          };
        })
      );
    }
  }, [appointments]);

  // eslint-disable-next-line no-extend-native
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  return (
    <div className="page-container">
      <div>
        <Sidebar links={getSidebarLinks("doctor", 3)} />
      </div>

      <div style={{ marginLeft: "20%", height: "100vh" }}>
        <CustomCalendar events={events} setDate={setDate} />
      </div>
    </div>
  );
};
export default DoctorCalendarPage;
