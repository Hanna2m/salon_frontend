// NEW BOOKING DATE

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import parseISO from "date-fns/parseISO";

// datepicker css file
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function NewBookingDate() {
  const [startDate, setStartDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    getTimeSlots();
    setStartDate(new Date());
  }, []);

  useEffect(() => {
    getTimeSlots();
  }, [startDate]);

  const handleDateChange = (date) => {
    setAvailableTimeSlots([]);
    let dt = new Date(date);
    let dd = dt.getDate();
    let mm = dt.getMonth() + 1;
    let yyyy = dt.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let newDate = yyyy + "-" + mm + "-" + dd;
    setStartDate(parseISO(newDate));
    return yyyy + "-" + mm + "-" + dd;
  };

  const getTimeSlots = async () => {
    try {
      await axios.get("appointments.json").then((response) => {
        let data = response.data;

        for (let i = 0; i < data.length; i++) {
          if (new Date(data[i].date).valueOf() === startDate.valueOf()) {
            if (data[i].isAvailable === true) {
              setAvailableTimeSlots((availableTimeSlots) => [
                ...availableTimeSlots,
                data[i].startTime,
              ]);
            }
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      <h3>Make Appointment</h3>
      <div>
        <h4>Select Date:</h4>
        <DatePicker
          minDate={new Date()}
          selected={startDate}
          onChange={handleDateChange}
          dateFormat="YYYY-MM-DD"
          shouldCloseOnSelect={false}
          inline
        />
      </div>

      <section>
        {!availableTimeSlots ? (
          <h2>Loading ..</h2>
        ) : (
          <div>
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((t, i) => <button key={i}>{t}</button>)
            ) : (
              <h4>No available appointments for selected date</h4>
            )}
          </div>
        )}
      </section>
    </section>
  );
}

export default NewBookingDate;
