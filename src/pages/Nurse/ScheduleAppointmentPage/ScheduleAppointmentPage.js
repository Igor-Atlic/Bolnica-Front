import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CustomCalendar from "../../../components/CustomCalendar/CustomCalendar";
import { Dropdown } from "react-bootstrap";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import NewAppointment from "../../../components/NewAppointment/NewAppointment";
import Header from "../../../components/Header/Header";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../../../redux/actions/appointments";
import DeleteAppointment from "../../../components/DeleteAppointment/DeleteAppointment";
import { getEmployees } from "../../../redux/actions/employee";
import { getPatients } from "../../../redux/actions/patients";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import CustomModal from "../../../components/CustomModal/CustomModal";

const ScheduleAppointmentPage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const patients = useSelector((state) => state.patients);
  const appointments = useSelector((state) => state.appointments);
  const [date, setDate] = useState(new Date());
  const [newAppointmentVisible, setNewAppointmentVisible] = useState(false);
  const [deleteAppointmentVisible, setDeleteAppointmentVisible] =
    useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [appointmentIdDelete, setAppointmentIdDelete] = useState(1);
  const [events, setEvents] = useState([]);
  const [cancelAppointmentId, setCancelAppointmentId] = useState(-1);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPatients());
  }, []);

  useEffect(() => {
    setSelectedDoctor(employees[0]);

    if (employees[0]) dispatch(getAppointments(employees[0].lbz));
  }, [employees]);

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

  const getDoctorAppointments = (lbz) => {
    const newDoctor = employees.find((doctor) => doctor.lbz === lbz);
    setSelectedDoctor(newDoctor);
    dispatch(getAppointments(lbz));
  };

  const setCancelAppointment = (id) => {
    setDeleteAppointmentVisible(true);
    setCancelAppointmentId(id);
  };

  const createNewAppointment = (patientId, date, examinationType, note) => {
    setNewAppointmentVisible(false);
    console.log({
      lbz: selectedDoctor.lbz,
      lbp: patientId,
      dateAndTimeOfAppointment: date,
      note,
      // examinationType,
    });
    dispatch(
      createAppointment(
        {
          lbz: selectedDoctor.lbz,
          lbp: patientId,
          dateAndTimeOfAppointment: date,
          note,
          // examinationType,
        },
        toggleModalSuccess,
        toggleModalError
      )
    );
  };

  const deleteAppointmentClick = () => {
    setDeleteAppointmentVisible(false);
    console.log({
      appointmentId: cancelAppointmentId,
      appointmentStatus: "OTKAZANO",
    });
    dispatch(
      updateAppointment({
        appointmentId: cancelAppointmentId,
        appointmentStatus: "OTKAZANO",
      })
    );
  };

  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);

  return (
    <div className="page-container">
      <div>
        <Sidebar links={getSidebarLinks("nurse", 3)} />
      </div>
      <CustomModal
        title="Uspeh"
        content="Uspesno zakazan pregled."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
      />
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom zakazivanja pregleda."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      {selectedDoctor && (
        <Dropdown className="dropdownButton">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Dr. {selectedDoctor.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {employees.map((doctor) => {
              if (doctor.lbz !== selectedDoctor.lbz)
                return (
                  <Dropdown.Item
                    key={doctor.lbz}
                    onClick={() => getDoctorAppointments(doctor.lbz)}
                  >
                    Dr. {doctor.name}
                  </Dropdown.Item>
                );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <div style={{ marginLeft: "20%", height: "100vh" }}>
        <CustomCalendar
          events={events}
          setDate={setDate}
          setNewAppointmentVisible={setNewAppointmentVisible}
          setCancelAppointment={setCancelAppointment}
          setAppointmentIdDelete={setAppointmentIdDelete}
        />
      </div>
      {newAppointmentVisible && selectedDoctor ? (
        <NewAppointment
          avatarUrl={"nikolaSlika 1.jpg"}
          userName={`Dr. ${selectedDoctor.name}`}
          userTitle={"Kardiolog"}
          doctorId={selectedDoctor.lbz}
          createNewAppointment={createNewAppointment}
          setNewAppointmentVisible={setNewAppointmentVisible}
          date={date}
          patients={patients}
        />
      ) : (
        <></>
      )}

      {deleteAppointmentVisible ? (
        <DeleteAppointment
          avatarUrl={"nikolaSlika 1.jpg"}
          userName={"Dr. Paun"}
          userTitle={"Kardiolog"}
          deleteAppointment={deleteAppointmentClick}
          date={date}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScheduleAppointmentPage;
