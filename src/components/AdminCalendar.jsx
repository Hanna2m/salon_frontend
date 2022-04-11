import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

import "react-big-calendar/lib/css/react-big-calendar.css";

function AdminCalendar() {
  const localizer = momentLocalizer(moment);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      await axios
        .get("https://groomer-server.herokuapp.com/appointment")
        .then((response) => {
          console.log(response.data);
          setAppointments(response.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  //   const events = [
  //     {
  //       title: "Wash",
  //       start: moment("2022-04-15T09:00:00.000Z").toDate(),
  //       end: moment("2022-04-15T09:30:00.000Z").toDate(),
  //       allDay: false,
  //     },
  //   ];

  const convertStartDateTime = (date, time) => {
    let newStartDate = moment.utc(date).toISOString();

    newStartDate = newStartDate.replace("T00:00", `T${time}`);

    return newStartDate;
  };

  const convertEndDateTime = (date, duration) => {
    let time = new Date(date);
    return moment(time.setMinutes(time.getMinutes() + duration)).toISOString();
  };

  const appointmentList = appointments.map((appointment) => {
    return {
      title: appointment.service.title,
      start: new Date(
        convertStartDateTime(appointment.day.date, appointment.time.startTime)
      ),

      end: new Date(
        convertEndDateTime(
          convertStartDateTime(
            appointment.day.date,
            appointment.time.startTime
          ),
          appointment.service.duration
        )
      ),
      allDay: false,
    };
  });

  return (
    <Calendar
      localizer={localizer}
      events={appointmentList}
      startAccessor={"start"}
      endAccessor={"end"}
      views={["agenda", "month", "day", "week"]}
      style={{ height: 450 }}
    />
  );
}

export default AdminCalendar;
