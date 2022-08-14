import React from "react";
import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css";
import "./styles.css";

const CustomCalendar = ({
  setDate,
  setNewAppointmentVisible,
  events,
  setCancelAppointment,
}) => {
  function onNewEventClick(data) {
    setNewAppointmentVisible(true);
    const date = new Date(data.startAt);
    console.log(date);
    setDate(date);
  }

  function onEventClick(data) {
    console.log(data.id);
    setCancelAppointment(data.id);
  }

  return (
    <Kalend
      style={{
        primaryColor: "#336cfb",
        baseColor: "#3d3c3c",
        inverseBaseColor: "#f2ecec",
      }}
      onEventClick={onEventClick}
      onNewEventClick={onNewEventClick}
      events={events}
      initialDate={"2019-11-21T18:00:00.000Z"}
      hourHeight={40}
      initialView={CalendarView.WEEK}
      disabledViews={[CalendarView.AGENDA, CalendarView.THREE_DAYS]}
      timeFormat={"24"}
      weekDayStart={"Monday"}
      calendarIDsHidden={["work"]}
      language={"en"}
    />
  );
};

export default CustomCalendar;
